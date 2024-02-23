import {useState} from 'react';
import {Link, useLoaderData, useNavigate} from 'react-router-dom';

const Users = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState(useLoaderData());
    const handleDelete = async (id) => {
        setUsers(users.filter(user => user._id !== id));
        try {
            await fetch(`http://localhost:5000/users/${id}`, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    alert(data.message)
                })

        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div>
            {users.map((user) => (
                <div className="rounded-lg mb-4 px-4 py-2 border border-blue-300" key={user._id}>
                    {user.name} - {user.email}
                    <Link to={`/users/${user._id}`}>
                        <button className="text-xs font-bold text-blue-700 !bg-white focus:border-none mx-2">edit
                        </button>
                    </Link>
                    <button
                        className="text-red-700 font-bold border border-red-500 py-1 px-2 ml-4 text-xs bg-white"
                        onClick={() => handleDelete(user._id)}> X
                    </button>

                </div>

            ))}
            <button className="mt-2 bg-white text-black " onClick={() => navigate('/')}>Back</button>
        </div>
    );
};

export default Users;
