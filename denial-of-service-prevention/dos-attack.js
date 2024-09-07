const axios = require('axios');

const performAttack = async () => {
    for (let i = 0; i < 20; i++) {
        try {
            const response = await axios.get('http://localhost:3000');
            console.log(`Response ${i}:`, response.data);
        } catch (err) {
            console.log(`Error ${i}:`, err.response.status);
        }
    }
};

performAttack();
