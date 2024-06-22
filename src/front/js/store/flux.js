const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			auth: false,
			email: null,
			token: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			signUp: async (email, password) => {
				try {
					const requestOptions = {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ email, password })
					};
					const response = await fetch(process.env.BACKEND_URL + '/api/signup', requestOptions);
					if (!response.ok) {
						const errorData = await response.json();
						throw new Error(errorData.message || 'An error occurred');
					}
					const data = await response.json();
					setStore({ auth: true, email: email, token: data.access_token });
					localStorage.setItem('token', data.access_token);
					return data;
				} catch (error) {
					console.error('Error signing up:', error);
					throw error;
				}
			},
			login: async (email, password) => {
                try {
                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email, password })
                    };
                    const response = await fetch(process.env.BACKEND_URL + '/api/login', requestOptions);
                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.message || 'An error occurred');
                    }
                    const data = await response.json();
                    setStore({ auth: true, email: email, token: data.access_token });
                    localStorage.setItem('token', data.access_token);
                    return data;
                } catch (error) {
                    console.error('Error logging in:', error);
                    throw error;
                }
            },
			logout: async () => {
                try {
                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({})
                    };
                    const token = getStore().token;
                    if (token) {
                        requestOptions.headers['Authorization'] = 'Bearer ' + token;
                    }
                    const response = await fetch(process.env.BACKEND_URL + '/api/logout', requestOptions);
                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.message || 'An error occurred');
                    }
                    setStore({ auth: false, email: null, token: null });
                    localStorage.removeItem('token');
                    return true;
                } catch (error) {
                    console.error('Error logging out:', error);
                    throw error;
                }
            },
			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
