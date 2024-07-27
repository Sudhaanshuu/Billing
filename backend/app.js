const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post('/calculate', (req, res) => {
    const { items, people } = req.body;

    // Calculate the subtotal
    let subtotal = 0;
    items.forEach(item => {
        subtotal += item.quantity * item.price;
    });

    const gst = subtotal * 0.05;
    const serviceCharge = subtotal * 0.05;
    const grandTotal = subtotal + gst + serviceCharge;

    // Calculate individual shares
    const sharedItems = items.filter(item => item.shared);
    const sharedTotal = sharedItems.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    const sharedPerPerson = sharedTotal / people.length;
    const taxPerPerson = (gst + serviceCharge) / people.length;

    const result = people.map(person => {
        const personalTotal = person.items.reduce((acc, itemId) => {
            const item = items.find(i => i.id === itemId);
            return acc + (item ? item.price : 0);
        }, 0);

        return {
            name: person.name,
            total: personalTotal + sharedPerPerson + taxPerPerson
        };
    });

    res.json({ subtotal, gst, serviceCharge, grandTotal, result });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});