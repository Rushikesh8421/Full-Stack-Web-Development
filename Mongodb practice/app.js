const mongoose = require('mongoose');

(async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/ankitKitty');

        const kittySchema = new mongoose.Schema({
            name: String
        });

        kittySchema.methods.speak = function speak() {
            const greeting = this.name
                ? 'Meow name is ' + this.name
                : 'I don\'t have a name';
            console.log(greeting);
        };

        const Kitten = mongoose.model('ankitKitty', kittySchema);

        const ankitKitty = new Kitten({ name: 'AnkitKitty' });
        console.log(ankitKitty.name); // 'AnkitKitty'

        await ankitKitty.save();
        ankitKitty.speak();
    } catch (err) {
        console.log(err);
    }
})();
