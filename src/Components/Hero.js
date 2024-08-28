



export default function Hero(){
    let heroStyle = {        
        backgroundColor:  "dodgerblue",  
         padding: "50px",  
         textAlign: "center",  
         marginBottom: "30px"
        
    }
    return (
        <div style={heroStyle} >
            <h1 className='mb-5'>IA Web Portal</h1>
            <a className="btn btn-light me-3" href="#" role="button"> Learn More </a>
            <a className="btn btn-outline-light" href="#" role="button"> Contact Us </a>
        </div>        
    ) 
} 