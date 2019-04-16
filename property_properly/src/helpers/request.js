class Request {

  get(url) {
    return fetch(url)
    .then((res) => res.json());
  }

	delete(url){
		return fetch(url, {
				method: 'DELETE',
				header: {'content-Type': 'application/json'}
		})
	}

	post(url, payload){
		return fetch(url, {
			method: 'POST',
			headers: {'content-Type': 'application/json'},
			body: JSON.stringify(payload)
		})
	}
}

export default Request;
