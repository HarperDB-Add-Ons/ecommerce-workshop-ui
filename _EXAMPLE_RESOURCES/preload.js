const preload = async() => {
	const response = await fetch(`https://ecommerce.edgecloud9.com/api/products`);
	const data = await response.json();
	for (let row of data) {
		const priceandqty = row.variations.map((r) => ({ id: r.id, name: r.name, price: r.price, onHandCount: r.onHandCount }));
		tables.products.put({ id: row.id, priceandqty });
	}
}
preload();
