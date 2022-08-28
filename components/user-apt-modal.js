import { useForm } from "react-hook-form";
const UserAptModal = ({ active, setactive }) => {
    const { register, formState: { errors } } = useForm({mode: 'onChange'});
    return (
        <div className={`modal ${active ? 'is-active' : ''}`}>
            <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Modal title</p>
                        <button className="delete" aria-label="close" onClick={() => setactive(false)}></button>
                    </header>
                <section className="modal-card-body">
                <textarea className='textarea is-success' placeholder="Message (optional)" {...register('message',{
                    required: false
                })}>
                </textarea>
                </section>
                <footer className="modal-card-foot">
                    <button className="button is-success">Book</button>
                    <button className="button" onClick={() => setactive(false)}>Cancel</button>
                </footer>
            </div>
        </div>
    )
}

export default UserAptModal; 