
import { useNavigate } from 'react-router';
import './Error.scss'

const index = () => {

  const navigate = useNavigate()

  return (
    <section className="page_404">
        <div className="container-fuild">
          <div className="">
            <div className="col-sm-12 ">
              <div className="col-sm-12 col-sm-offset-1 text-center content404">
                <div className="four_zero_four_bg">
                  <h1 className="text-center ">404</h1>
                </div>

                <div className="contant_box_404">
                  <h3 className="h2">Look like you're lost</h3>

                  <p>the page you are looking for not avaible!</p>

                    <div className="link_404" onClick={()=>{navigate('/')}}>Go to Home</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default index
