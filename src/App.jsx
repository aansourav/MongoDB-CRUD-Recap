import {
    Card, Input, Button, Typography,
} from "@material-tailwind/react";
import './App.css'

function App() {

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target
        const name = form.name.value
        const email = form.email.value
        const user = {name, email}

        fetch("http://localhost:5000/users", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then((data) => {
                if (data.insertedId) alert('Inserted Successfully')
                form.reset()

            })
    }
    return (<Card color="transparent" shadow={false}>
            <Typography variant="h4" color="blue-gray">
                Sign Up
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                Nice to meet you! Enter your details to register.
            </Typography>
            <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-1 flex flex-col gap-6">
                    <div className="flex gap-4 ">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Your Name
                        </Typography>
                        <Input
                            size="lg"
                            name="name"
                            placeholder="name"
                            className="px-2 py-2 rounded-lg border border-blue-200 focus:border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                    </div>
                    <div className="flex gap-4">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Your Email
                        </Typography>
                        <Input
                            name="email"
                            size="lg"
                            placeholder="mail"
                            className="px-2 py-2 rounded-lg border border-blue-200 focus:border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                    </div>
                </div>
                <Input
                    className="mt-4 border-2 px-3 py-2"
                    type="submit"
                    value="Submit"
                />
            </form>
        </Card>
    );
}

export default App;
