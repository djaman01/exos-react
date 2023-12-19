import './templates.css'

export default function Templates() {


  return (
    <>
      <button className="custom-btn btn-1">Read More</button>
      <button className="custom-btn btn-2">Read More</button>
      <button className="custom-btn btn-3"><span>Read More</span></button>
{/* Vide games button */}
      <span className='start-btn'>START</span>
   
   <div>

    {/* Form with beautiful background */}
    
   <form className="form">
     <div className="form-title"><span>sign in to your</span></div>
      <div className="title-2"><span>SPACE</span></div>
      <div className="input-container">
        <input className="input-mail" type="email" placeholder="Enter email" />
        <span> </span>
      </div>

      <section className="bg-stars">
        <span className="star"></span>
        <span className="star"></span>
        <span className="star"></span>
        <span className="star"></span>
      </section>

      <div className="input-container">
        <input className="input-pwd" type="password" placeholder="Enter password" />
      </div>
      <button type="submit" className="submit">
        <span className="sign-text">Sign in</span>
      </button>

      <p className="signup-link">
        No account?
        <a href="" className="up">Sign up!</a>
      </p>
       
   </form>

   </div>
    </>
  )
}
