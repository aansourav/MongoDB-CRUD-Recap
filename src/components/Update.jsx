import {useLoaderData, useNavigate} from "react-router-dom";
import {Card, Input, Typography} from "@material-tailwind/react";

const Update = () => {
    const navigate = useNavigate()
    const user = useLoaderData()
    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const email = form.email.value
        const updatedUser = {name, email}

        fetch(`http://localhost:5000/users/${user._id}`, {
            method: "PUT", headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(updatedUser)
        }).then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert("Updated successfully")
                }
            })


    }

    return (<Card color="transparent" shadow={false}>
            <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-1 flex flex-col gap-6">
                    <div className="flex gap-4 ">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Your Name
                        </Typography>
                        <Input
                            size="lg"
                            name="name"
                            defaultValue={user.name}
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
                            defaultValue={user.email}
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
                <button className="mt-2 bg-white text-black " onClick={()=>navigate('/users')} >Back</button>
            </form>
        </Card>);
};

export default Update;
