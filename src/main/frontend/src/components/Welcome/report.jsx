import { MobilePDFReader } from 'react-read-pdf';
import PDF from "../assets/pdf/report.pdf"
function Welcome() {
    return (
        <div style={{overflow:'hidden',height:"100%"}}>
            <MobilePDFReader url={PDF}/>
           </div>
    )
}
export default Welcome;