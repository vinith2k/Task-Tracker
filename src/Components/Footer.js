import { Link } from "react-router-dom"
const Footer = () => {
  return (
   <footer>
       <center>
       <p style={{color:'#1d3557'}}>Copyright &copy; 2022</p>
       <Link to="/about">About </Link>
       </center>
   </footer>
  )
}

export default Footer