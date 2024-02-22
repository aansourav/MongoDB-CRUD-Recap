import {useState} from 'react';
import {useLoaderData} from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState(useLoaderData());
    const handleClick = async (id) => {
        try {
            await fetch(`http://localhost:5000/users/${id}`, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => alert(data.message))
            setUsers(users.filter(user => user._id !== id));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div>
            {users.map((user) => (
                <div className="rounded-lg mb-4 px-4 py-2 border border-blue-300" key={user._id}>
                    {user.name} - {user.email}
                    <button
                        className="text-red-700 font-bold border border-red-500 py-1 px-2 ml-4 text-xs bg-white"
                        onClick={() => handleClick(user._id)}> X
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Users;
