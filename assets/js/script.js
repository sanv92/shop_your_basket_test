var shopList = [
	{
		name: 'Cotton T-Shirt, Medium', count: 1, price: 1.99
	},
	{
		name: 'Baseball Cap, One Size', count: 2, price: 5.98
	},
	{
		name: 'Swim Shorts, Medium', count: 1, price: 3.99
	}
];

function shopClass() {
	var $this = this;
	$this.increment = function(id) {
		var $this = this;
		$this.id = id;
		$this.name = name;
		alert($this.name);
		//$this.id;
		return ;
	},
	$this.decrement = function(id) {
		var $this = this;
		$this.id = id;
		alert(1);
		
		return ;
	},
	$this.calc = function(id,count) {
		var $this = this;
		$this.id = id;
		
		return ;
	}
}

var shop = new shopClass();
