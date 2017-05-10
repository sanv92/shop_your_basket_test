var shopList = {
	tax: 20,
	min: 1,
	max: 10,
	list: {
		0:{ name: 'Cotton T-Shirt, Medium', count: 1, price: 1.99 },
		1:{ name: 'Baseball Cap, One Size', count: 2, price: 2.99 },
		2:{ name: 'Swim Shorts, Medium', count: 1, price: 3.99 }
	}
};

function ShopClass(shopListObj) {
	var increment = function(id, elm) {
		var index = id;
		if (shopListObj.list[index].count < shopListObj.max) {
			shopListObj.list[index].count += 1;
		}
		calc(id, elm);
	},
	decrement = function(id, elm) {
		var index = id;
        if (shopListObj.list[index].count > shopListObj.min) {
			shopListObj.list[index].count -= 1;
        }
		calc(id, elm);
	},
	pressure = function(id, elm) {
		var index = id;
		var count = elm.value.replace(/\D/g, '');
		shopListObj.list[index].count = count;

		if(shopListObj.list[index].count < shopListObj.min) {
			shopListObj.list[index].count = shopListObj.min;
		} else if(shopListObj.list[index].count > shopListObj.max) {
			shopListObj.list[index].count = shopListObj.max;
		} else {
			shopListObj.list[index].count = count;
		}

		calc(id, elm);
	},
	remove = function(id, elm) {
		var index = id;
		var msg = 'Are you sure you want to delete: ' + shopListObj.list[index].name + '?';

		if (confirm(msg)) {
			if(shopListObj.list[index]) { //remove row
				delete shopListObj.list[index];
				$(elm).closest('li').remove();
				var len = 0;
				for (var k in shopListObj.list) {
					len++;
				}
				if(!len) { //remove form
					$('#submit').children().prop( 'disabled', true );
				}
			}
			calc(id, elm);
		}
	},
	submit = function(elm) {
			$.post('shop.php', { 'tax' : shopListObj.tax, 'min' : shopListObj.min, 'max' : shopListObj.max, 'list' : shopListObj.list },
			function(data){
				alert('Ajax call is complete');
			}).fail(function() {
				alert( 'error' );
			},'json');
	},
	calc = function(index, elm) {

    //subtotal
		var subt = (function () {
			var price = 0;
			$.each(shopListObj.list, function(i, item) {
				price += item.count * item.price;
			});
			return price;
		}());

    $('#sub_total').text(subt.toFixed(2));
    
		//vat
    var vat = subt * shopListObj.tax / 100;
		$('#vat').text(vat.toFixed(2));
    
		//total
    var total = subt+vat;
		$('#total').text(total.toFixed(2));

	var base = $(elm).closest('li');
	var list = shopListObj.list[index];
		if(shopListObj.list[index]) { //check row exist
			var t_price = list.count * list.price;
			//cost
			base.find('.t_price').text(t_price.toFixed(2));
			//count
			base.find('[name="count[]"]').val(list.count);
		}
	};
  
	return {
		increment: increment,
		decrement: decrement,
		pressure: pressure,
		remove: remove,
		submit: submit,
		calc: calc
	};
}

var shop = new ShopClass(shopList);
