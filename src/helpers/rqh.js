const rqh = {
	
	get: function(url, id){
		let headers = {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Client-Identifier': id
		};

		return fetch(url, {
			method: "GET",
			headers: headers
		});
    }
}

export default rqh;