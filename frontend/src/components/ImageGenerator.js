import { useState, useEffect } from 'react'
import { UncontrolledAlert } from 'reactstrap';
import ImageContainer from './ImageContainer'
import Spinner from './Spinner'
export default function ImageGenerator() {
    const [form, setForm] = useState({
        prompt: '',
        size: 'small',
        n: 1
    })
    const [error, setError] = useState()

    const [isLoading, setIsLoading] = useState(false)

    const [data, setData] = useState(null)

    const [visible, setVisible] = useState(true);

    const onDismiss = () => setVisible(false);


    useEffect(() => {
        setError("")
    }, [data]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const api_url = process.env.REACT_APP_BACKEND_API_URL
            setIsLoading(true)
            const response = await fetch(`${api_url}/openai/generateimage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form)
            })
            console.log('response: ', response)
            if (!response.ok) {
                setIsLoading(false)
                throw new Error('That image could not be generated!')
            }

            const data = await response.json()
            console.log('data: ', data)
            setData(data.data)
            setIsLoading(false)
            console.log(form)
        } catch (error) {
            setError(error.message ? error.message : 'something went wrong!')
            setIsLoading(false)
        }
    }
    return (
        <>

            {error ? <UncontrolledAlert color="danger">
                {error}
            </UncontrolledAlert> : ""}

            <header>
                <div className="navbar">
                    <div className="logo">
                        <h2>OpenAI Image Genrator</h2>
                    </div>
                    <div className="nav-links">
                        <ul>
                            <li>
                                <a href="https://beta.openai.com/docs" target="_blank"
                                >OpenAI API Docs</a
                                >
                            </li>
                        </ul>
                    </div>
                </div>
            </header>

            <main>
                <section className="showcase">
                    <form id="image-form">
                        <h1>Describe An Image</h1>
                        <div className="form-control">
                            <input type="text" id="prompt" name="prompt" placeholder="Enter Text" value={form.prompt} onChange={handleChange} required />
                        </div>
                        {/* <!-- size --> */}
                        <div className="form-control">
                            <select name="size" id="size" defaultValue={form.size} onChange={handleChange}>
                                <option value="small">Small</option>
                                <option value="medium" selected>Medium</option>
                                <option value="large">Large</option>
                            </select>
                        </div>

                        <div className="form-control">
                            <input type="number" id="n" name="n" placeholder="Number Of Images To Generate" min="1" max="5" value={form.n} onChange={handleChange} required />

                        </div>

                        <button type="submit" className="btn" onClick={handleSubmit}>Generate</button>
                    </form>
                </section>

                {/* <img src="https://oaidalleapiprodscus.blob.core.windows.net/private/org-Ux7V83c5ACJzTaXpyAMXXhwK/user-duFmpiILYtX7PAOUvn2vwqk8/img-AYUWetMZKdniXCrjZYjn01ct.png?st=2022-12-13T07%3A15%3A29Z&se=2022-12-13T09%3A15%3A29Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-12-13T07%3A25%3A09Z&ske=2022-12-14T07%3A25%3A09Z&sks=b&skv=2021-08-06&sig=%2B0GzsPmJzAAxL07NbTPySMEgWRJEishyN9NQWIsL%2BPw%3D" alt="generated_image" /> */}

                <section className="image">

                    <div className="container">
                        {
                            data ? data.map((image) => {
                                return (<div className="image-container">
                                    {console.log('image source: ', image.url)}
                                    <img src={image.url} alt="generated_image" />
                                </div>)
                            })
                                : null}
                    </div>
                </section>
            </main>

            {isLoading ? <Spinner /> : null}
        </>
    )
}