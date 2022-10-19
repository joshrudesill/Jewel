

const Footer = () => (
    <div className='footer mt-5'>
        <div className='content'>
            <div className='columns'>
                <div className='column'>
                    <div className='icon-text'>
                        <span className='icon is-size-1 has-text-react' ><ion-icon name="logo-react" ></ion-icon></span>
                        <span >Made with React and Next.js</span>
                    </div>
                    <div className='icon-text mt-2'>
                        <span className='icon is-size-1 has-text-dark' ><ion-icon name="logo-vercel"></ion-icon></span>
                        <span >Deployed on Vercel</span>
                    </div>
                    <div className='icon-text mt-2'>
                        <span className='icon is-size-1' ><ion-icon name="server-outline"></ion-icon></span>
                        <span >MySQL (deployed serverless on PlanetScale)</span>
                    </div>
                </div>
                <div className='column is-narrow '>
                    <span >Built by Josh Rudesill 2022</span>
                    <div className='icon-text mt-2 '>
                        <a className='icon is-size-1 has-text-dark' href='https://github.com/joshrudesill/jewel'target='_blank' rel='noreferrer'><ion-icon name="logo-github"></ion-icon></a>
                        <a href='https://github.com/joshrudesill/jewel'target='_blank' rel='noreferrer'>GitHub</a>
                    </div>
                    <div className='icon-text mt-2'>
                        <a className='icon is-size-1' href='#'target='_blank' rel='noreferrer'><ion-icon name="open-outline"></ion-icon></a>
                        <a target='_blank' rel='noreferrer' href='https://jrudesill.dev'>Resume</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
)


export default Footer;