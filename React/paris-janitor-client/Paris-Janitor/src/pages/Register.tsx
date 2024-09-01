import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Register() {
    const [name, setName] = useState("");
    const [firstname, setFirstname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function register(ev: React.FormEvent) {
        ev.preventDefault();
        axios.post("http://localhost:3000/auth/signup", { name, firstname, email, password })
    }
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="-mt-64">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form className=" max-w-md mx-auto" onSubmit={register}>
                    <input type="text" placeholder="name" value={name} onChange={ev => setName(ev.target.value)}  />
                    <input type="text" placeholder="firstname" value={firstname} onChange={ev =>setFirstname(ev.target.value)}  />
                    <input type="email" placeholder="your@email.com" value={email} onChange={ev => setEmail(ev.target.value)}  />
                    <input type="password" placeholder="password" value={password} onChange={ev => setPassword(ev.target.value)} />
                    <button className="login">Register</button>
                    <div className="text-center py-2 text-gray-500" >Already a member ? <Link className="underline text-black" to={"/login"} >Login</Link></div>
                </form>
            </div>
        </div>
    );
}