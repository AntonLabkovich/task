import './styles/style.css'
import './styles/media.css'

document.addEventListener('DOMContentLoaded',()=>{
	const form = document.querySelector('#form');
	
	
	form.addEventListener('submit', async (e)=>{
		e.preventDefault()
		const formData = new FormData(form)
		for(let [key, value] of formData.entries()){
			if(value){
				document.getElementsByName(key)[0].parentNode.classList.remove('error')
				document.getElementsByName(key)[0].value = ''
			}else{
				document.getElementsByName(key)[0].parentNode.classList.add('error')
				document.getElementsByName(key)[0].value = ''
			}
		}
		console.log('all',document.querySelectorAll('.error').length)
		if(!document.querySelectorAll('.error').length){
			try{
				let optons = {
					method: 'POST',
					body: formData
				}
				let respose = await sendData('https://jsonplaceholder.typicode.com/posts',optons)
				if(respose.ok){
					console.log('ok')
					document.querySelector('.form').insertAdjacentHTML('beforeend','<p>отправлено</p>')
				}else{
					console.log('not ok')
				}	
			}catch{
				console.log('error')
			}		
		}
		
	})
})

function sendData(url, optons) {
	return fetch(url, {
		method: optons.method,
		body: optons.body,
		header: {
			'Content-type': 'application/json; charset=UTF-8'
		} 
	})
}


