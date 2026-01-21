import { React, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from "react-redux";
import { fetchHeaderSettings } from '../../redux/headerSlice';

const Topbar = () => {
  const dispatch = useDispatch();

  const { data, loading, lastUpdated } = useSelector((state) => state.header);

  useEffect(() => {
    dispatch(fetchHeaderSettings());

  }, []);
  // console.log("header data", data);
  return (
    <>
      {data?.topbar_heding && data?.facebook_link && data?.instagram_link && data?.youtube_link && data?.whatsapp_number && data?.linkedin_link && (
        <div className="topbar">
          <Container fluid className="p-0">
            <Row>
              <Col>
                <div className="topbar-content">
                  <div className="topbar_left">
                    <ul>
                      {data?.facebook_link && (
                        <li>
                          <a href={data.facebook_link} target="_blank" >
                            <i className='fa fa-facebook-official'></i>
                          </a>
                        </li>
                      )}
                      {data?.instagram_link && (
                        <li>
                          <a href={data.instagram_link} target="_blank" >
                            <i className='fa fa-instagram'></i>
                          </a>
                        </li>
                      )}
                      {data?.youtube_link && (
                        <li>
                          <a href={data.youtube_link} target="_blank" >
                            <i className='fa fa-youtube-play'></i>
                          </a>
                        </li>
                      )}

                      {data?.whatsapp_number && (
                        <li>
                          <a href={data.whatsapp_number} target="_blank" >
                            <i className='fa fa-whatsapp'></i>
                          </a>
                        </li>
                      )}

                      {data?.linkedin_link && (
                        <li>
                          <a href={data.linkedin_link} target="_blank" >
                            <i className='fa fa-linkedin'></i>
                          </a>
                        </li>
                      )}


                    </ul>
                  </div>

                  <div className="topbar_center">
                    {data?.topbar_heding && (
                      <span>{data.topbar_heding}</span>
                    )}
                  </div>
                </div>
              </Col>




            </Row>
          </Container>
        </div>
      )}
    </>
  )
}
export default Topbar;