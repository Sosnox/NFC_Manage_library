import Link from "next/link";
function Login() {
    return (

        <div className="flex justify-center items-center h-screen form-container">
            <form className="flex flex-col form-bg">
                <label>อีเมล : </label>
                <input type="text" placeholder="info"></input>
                <label>พาสเวิร์ด : </label>
                <input type="text" placeholder="info"></input>
                <Link href={'./@admin/visualization'}>
                    <button type="submit">Log in</button>
                </Link>
            </form>
        </div>
    );
}

export default Login