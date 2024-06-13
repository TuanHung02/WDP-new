import React, { useState, useEffect } from 'react';
import { Navbar, NavbarLogin, Footer } from '@/layout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Aos from 'aos';
import { jwtDecode } from 'jwt-decode';
import moment from 'moment';
import NavbarPartnerLogin from '../../layout/NavbarPartnerLogin/index.jsx';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DetailTour = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logPartner, setLogPartner] = useState(false);
  const [user, setUser] = useState({});
  const [tours, setTours] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [tourData, setTourData] = useState([])
  const navigate = useNavigate();

  const [nameTour, setNameTour] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [maxTourist, setMaxTourist] = useState('');
  const [transportion, setTransportion] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startPosition, setStartPosition] = useState('');
  const [endPosition, setEndPosition] = useState('');
  const [description, setDescription] = useState('');
  const [tax, setTax] = useState('');
  const [duration, setDuration] = useState('');
  const [image, setImage] = useState('');
  const [location, setLocation] = useState([]);
  const [vehicle, setVehicle] = useState([]);

  const handleEditorChange = (event, editor) => {
    const htmlData = editor.getData();
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlData;
    const plainTextData = tempDiv.textContent || tempDiv.innerText || "";
    setDescription(plainTextData);
  };

  useEffect(() => {
    Aos.init({ duration: 2000 });
    const token = localStorage.getItem('token');
    setIsLoggedIn(Boolean(token));
  }, [isLoggedIn, logPartner]);

  // Get api user to set role
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        setIsLoggedIn(Boolean(token));
        if (token) {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.user_id;
          const response = await axios.get(`http://localhost:8080/api/user/${userId}`);
          const userData = response.data.data;
          setUser(userData);
          const rid = decodedToken.role;
          if (rid === 'PARTNER') {
            setLogPartner(true);
          } else {
            setLogPartner(false);
          }
        }
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchData();
  }, []);

  const { id } = useParams();

  // Get api tour and schedule
  useEffect(() => {
    const fetchTourAndSchedule = async () => {
      try {
        const [tourResponse, scheduleResponse] = await Promise.all([
          axios.get(`http://localhost:8080/api/tour/${id}`),
          axios.get(`http://localhost:8080/api/schedule/${id}`)
        ]);
        const toursData = tourResponse.data.tour.tour;
        const scheduleData = scheduleResponse.data.schedules;
        setTourData(toursData);
        setSchedule(scheduleData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTourAndSchedule();
  }, [id]);

  console.log(tourData);

  // Get api location and vehicle
  useEffect(() => {
    const fetchLocationAndVehicle = async () => {
      try {
        const [locationResponse, vehicleResponse] = await Promise.all([
          axios.get('http://localhost:8080/api/location/all'),
          axios.get('http://localhost:8080/api/transportion')
        ]);
        const locationData = locationResponse.data.locations.locationSaved;
        const vehicleData = vehicleResponse.data.transportions;
        setLocation(locationData);
        setVehicle(vehicleData);
      } catch (error) {
        console.log('Error ne: ', error);
      }
    };

    fetchLocationAndVehicle();
  }, []);

  useEffect(() => {
    if (tourData) {
      setNameTour(tourData?.tour_name || '');
      setPrice(tourData?.tour_price || '');
      setDiscount(tourData?.discount || '');
      setMaxTourist(tourData?.max_tourist || '');
      if (tourData.tour_transportion && tourData.tour_transportion.length !== 0) {
        setTransportion(tourData?.tour_transportion[0]?._id || '');
      }
      setStartDate(moment(tourData?.start_date).format('YYYY-MM-DD') || '');
      setEndDate(moment(tourData?.end_date).format('YYYY-MM-DD') || '');
      setStartPosition(tourData?.start_position?._id || '');
      if (tourData.end_position && tourData.end_position.length !== 0) {
        setEndPosition(tourData?.end_position[0]?._id || '');

      }
      setDescription(tourData?.tour_description || '');
      setTax(tourData?.return_tax || '');
      setDuration(tourData?.duration || '');
      setImage(tourData?.tour_img || '');
    }
  }, [tourData]);


  const handleSubmit = (e) => {
    e.preventDefault();

    // Put data tour
    axios.put(`http://localhost:8080/api/tour/update/${id}`, {
      "tour_name": nameTour,
      "tour_description": description,
      "tour_transportion": transportion,
      "tour_price": price,
      "discount": discount,
      "tour_img": image,
      "max_tourist": maxTourist,
      "start_date": startDate,
      "end_date": endDate,
      "start_position": startPosition,
      "end_position": endPosition,
      "duration": duration,
      "return_tax": tax
    }, {
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        const updatedTour = response.data;
        setTourData(updatedTour);
        console.log("update tour:", updatedTour);
        toast.success('Update tour successfully!');
        navigate('/manage-tour')
      })
      .catch((error) => {
        console.log(error.response)
        toast.error(error.response.data.error)
      });
  };


  return (
    <>
      {isLoggedIn ? (
        logPartner ? (
          <NavbarPartnerLogin />
        ) : (
          <NavbarLogin />
        )
      ) : (
        <Navbar />
      )}

      <div>
        <section className="w-full bg-boat bg-cover bg-bottom bg-no-repeat h-[50vh] flex justify-center bg-color2 bg-blend-multiply bg-opacity-50">
          <div className="w-full container flex justify-center items-center flex-col">
            <p className="text-white font-secondary text-3xl 2xl:text-6xl">
              Manage Tour
            </p>
          </div>
        </section>

        <div className="mt-16">
          <div data-aos="fade-up" data-aos-duration="2500" className="secIntro">
            <h2 className="secTitle font-bold text-xl">
              Innovate Captivating Tours
            </h2>
            <p>
              Create captivating and exciting tours, enabling customers to have
              the best experiences possible.
            </p>
          </div>
        </div>

        <div style={{ marginTop: '2rem ', marginBottom: '6rem' }}>
          <div className="bg-white border border-4 rounded-lg shadow relative m-10">
            <div className="flex items-start justify-between p-5 border-b rounded-t">
              <h3 className="text-xl font-semibold">Edit Detail Tour</h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                data-modal-toggle="product-modal"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              {[tourData]?.map((item) => (
                <form onSubmit={handleSubmit} key={item?.id}>
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-full">
                      <label
                        htmlFor="tour-name"
                        className="text-sm font-medium text-gray-900 block mb-2"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="tour-name"
                        id="tour-name"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        placeholder=""
                        required=""
                        defaultValue={item?.tour_name}
                        onChange={(event) => { setNameTour(event.target.value) }}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="price"
                        className="text-sm font-medium text-gray-900 block mb-2"
                      >
                        Price
                      </label>
                      <input
                        type="number"
                        name="price"
                        id="price"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        placeholder="$$$"
                        required=""
                        defaultValue={item?.tour_price}
                        onChange={(event) => setPrice(event.target.value)}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="price"
                        className="text-sm font-medium text-gray-900 block mb-2"
                      >
                        Discount
                      </label>
                      <input
                        type="number"
                        name="discount"
                        id="discount"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        placeholder="$$$"
                        required=""
                        defaultValue={item?.discount}
                        onChange={(event) => { setDiscount(event.target.value) }}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="max-tourist"
                        className="text-sm font-medium text-gray-900 block mb-2"
                      >
                        Max Tourist
                      </label>
                      <input
                        type="number"
                        name="max-tourist"
                        id="max-tourist"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        placeholder=""
                        required=""
                        defaultValue={item?.max_tourist}
                        onChange={(event) => setMaxTourist(event.target.value)}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="transportion"
                        className="text-sm font-medium text-gray-900 block mb-2"
                      >
                        Transportion
                      </label>
                      <select
                        style={{
                          width: '100%',
                          padding: '10px',
                          fontSize: '14px',
                          borderRadius: '8px',
                          backgroundColor: '#f9fafb',
                          border: '1px solid #e5e7eb',
                        }}
                        name="transportion"
                        required
                        onChange={(e) => setTransportion(e.target.value)}
                      >
                        <option>
                          {item?.tour_transportion?.[0]?.transportion_name}
                        </option>
                        {vehicle.map((veh) => (
                          <option value={veh._id} key={veh._id}>
                            {veh?.transportion_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="start-date"
                        className="text-sm font-medium text-gray-900 block mb-2"
                      >
                        Start Date
                      </label>
                      <input
                        type="date"
                        name="start-date"
                        id="start-date"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        required=""
                        defaultValue={moment(item.start_date).format('YYYY-MM-DD')}
                        onChange={(event) => setStartDate(event.target.value)}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="end-date"
                        className="text-sm font-medium text-gray-900 block mb-2"
                      >
                        End Date
                      </label>
                      <input
                        type="date"
                        name="end-date"
                        id="end-date"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        required=""
                        defaultValue={moment(item?.end_date).format('YYYY-MM-DD')}
                        onChange={(event) => setEndDate(event.target.value)}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="start-position"
                        className="text-sm font-medium text-gray-900 block mb-2"
                      >
                        Start Position
                      </label>
                      <select
                        style={{
                          width: '100%',
                          padding: '10px',
                          fontSize: '14px',
                          borderRadius: '8px',
                          backgroundColor: '#f9fafb',
                          border: '1px solid #e5e7eb',
                        }}
                        name="start-position"
                        required
                        onChange={(event) => setStartPosition(event.target.value)}
                      >
                        <option>{item?.start_position?.location_name || "No Start Position"}</option>
                        {location.map((loc) => (
                          <option value={loc._id} key={loc._id}>
                            {loc?.location_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="start-position"
                        className="text-sm font-medium text-gray-900 block mb-2"
                      >
                        End Position
                      </label>
                      <select
                        style={{
                          width: '100%',
                          padding: '10px',
                          fontSize: '14px',
                          borderRadius: '8px',
                          backgroundColor: '#f9fafb',
                          border: '1px solid #e5e7eb',
                        }}
                        name="end-position"
                        required
                        onChange={(event) => { setEndPosition(event.target.value) }}
                      >
                        {item?.end_position && item?.end_position[0]?.location_name && (
                          <option>{item.end_position[0]?.location_name || "No End Position"}</option>
                        )}
                        {location.map((loc) => (
                          <option value={loc._id} key={loc._id}>
                            {loc?.location_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="ol-span-6 sm:col-span-3">
                      <label
                        for="tax"
                        className="text-sm font-medium text-gray-900 block mb-2"
                      >
                        Tax
                      </label>
                      <input
                        type="number"
                        name="tax"
                        id="tax"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        defaultValue={item?.return_tax}
                        onChange={(event) => { setTax(event.target.value) }}
                      />
                    </div>

                    <div className="ol-span-6 sm:col-span-3">
                      <label
                        for="duration"
                        className="text-sm font-medium text-gray-900 block mb-2"
                      >
                        Duration
                      </label>
                      <input
                        type="text"
                        name="Duration"
                        id="Duration"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        defaultValue={item?.duration}
                        onChange={(event) => { setDuration(event.target.value) }}
                      />
                    </div>                 

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="image"
                        className="text-sm font-medium text-gray-900 block mb-2"
                      >
                        Url image
                      </label>
                      <input
                        type="text"
                        name="image"
                        id="image"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        placeholder="Paste url image of tour"
                        required
                        defaultValue={item?.tour_img}
                        onChange={(e) => setImage(e.target.value)}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <div className="mb-5 rounded-md bg-[#F5F7FB] py-4 px-8">
                        <div className="flex item-center justify-between">
                          <img src={item?.tour_img} alt="Tour image" />
                        </div>
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="description"
                        className="text-sm font-medium text-gray-900 block mb-2"
                      >
                        Tour Description
                      </label>
                      <CKEditor
                        editor={ClassicEditor}
                        data={item?.tour_description}
                        onChange={handleEditorChange}
                      />
                    </div>
                  </div>
           
                  <div className="p-6 border-t border-gray-200 rounded-b">
                    <button
                      className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Save
                    </button>
                    <button
                      className="ml-4 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      onClick={() => navigate('/manage-tour')}
                    >
                      Return Manage Tour
                    </button>
                  </div>
                </form>
              ))}
            </div>


          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default DetailTour;