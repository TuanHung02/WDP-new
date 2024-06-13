import React, { useState, useEffect } from 'react';
import { Navbar, NavbarLogin, Footer } from '@/layout';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Aos from 'aos';
import NavbarPartnerLogin from '../../layout/NavbarPartnerLogin/index.jsx';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode';
import moment from 'moment';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const ScheduleList = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [logPartner, setLogPartner] = useState(false);
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();
    const [tour, setTour] = useState([]);
    const [editingSchedule, setEditingSchedule] = useState(null);

    // Field form schedule list
    const [schedule, setSchedule] = useState([])
    const [scheduleName, setScheduleName] = useState('');
    const [scheduleDetail, setScheduleDetail] = useState('');
    const [scheduleDate, setScheduleDate] = useState('');
    const [showEditForm, setShowEditForm] = useState(false);

    const handleEditSchedule = () => {
        setShowEditForm(true);
    };

    const handleCancelEdit = () => {
        setShowEditForm(false);
    };

    const handleEditorChange = (event, editor) => {
        const htmlData = editor.getData();
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = htmlData;
        const plainTextData = tempDiv.textContent || tempDiv.innerText || "";
        setScheduleDetail(plainTextData);
    };

    useEffect(() => {
        const dataSchedule = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/schedule/${id}`)
                const dSchedule = response.data.schedules;
                console.log(dSchedule);
                setSchedule(dSchedule);
            } catch (error) {
                console.log(error);
            }
        }

        dataSchedule();
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                Aos.init({ duration: 2000 });
                const token = localStorage.getItem('token');
                setIsLoggedIn(Boolean(token));
                // Get user to set role
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

                // Get tour detail
                const tourResponse = await axios.get(`http://localhost:8080/api/tour/${id}`);
                const tourData = tourResponse.data.tour.tour;
                setTour(tourData);
            } catch (error) {
                console.log('Error:', error);
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'schedule-name':
                setScheduleName(value);
                break;
            case 'schedule-date':
                setScheduleDate(value);
                break;
            case 'schedule-detail':
                setScheduleDetail(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(`${id}`);

        try {
            const response = await axios.post('http://localhost:8080/api/schedule/create', {
                "schedule_name": scheduleName,
                "schedule_date": scheduleDate,
                "schedule_detail": scheduleDetail,
                "tour_id": `${id}`
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const schedule = response.data;
            toast.success("Create schedule successful ~");
            navigate('/manage-tour')
        } catch (error) {
            const errorData = error.response.data.error;
            toast.error(errorData);
        }
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
                            Schedule Tour
                        </p>
                    </div>
                </section>

                <div className="mt-16">
                    <div data-aos="fade-up" data-aos-duration="2500" className="secIntro">
                        <h2 className="secTitle font-bold text-xl">
                            List schedule of tour
                        </h2>
                        <p>
                            Let's create a schedule to serve tourists.
                        </p>
                    </div>
                </div>

                <div style={{ marginTop: '2rem ', marginBottom: '6rem' }}>
                    <div className="bg-white border border-4 rounded-lg shadow relative m-10">
                        <div className="flex items-start justify-between p-5 border-b rounded-t">
                            <h3
                                className="text-xl font-semibold"
                            >
                                Schedule of tour: "  {tour.tour_name}"
                            </h3>
                        </div>

                        {/* {schedule.map((list) =>
                            <div style={{ marginLeft: "30px", marginBottom: "20px" }} key={list._id}>
                                <Card sx={{ maxWidth: "100% " }}>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {list.schedule_name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" style={{ marginTop: "15px" }}>
                                            {list.schedule_detail}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" style={{ marginTop: "35px" }}>
                                            {moment(list.schedule_date).format('DD/MM/YYYY')}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" onClick={() => navigate(`/edit-schedule/${list._id}`)}>Edit schedule</Button>
                                    </CardActions>
                                </Card>
                            </div>
                        )} */}

                        <div>
                            {schedule.map((list) => (
                                <div
                                    style={{ marginLeft: "30px", marginBottom: "20px" }}
                                    key={list._id}
                                >
                                    <Card sx={{ maxWidth: "100% " }}>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {list.schedule_name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" style={{ marginTop: "15px" }}>
                                                {list.schedule_detail}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" style={{ marginTop: "35px" }}>
                                                {moment(list.schedule_date).format('DD/MM/YYYY')}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small" onClick={handleEditSchedule}>
                                                Edit schedule
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </div>
                            ))}
                        </div>




                        <div className="p-6 border-t border-gray-200 rounded-b" style={{ textAlign: "center" }}>
                            <button
                                className="ml-4 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                onClick={() => navigate('/manage-tour')}
                            >
                                Return Manage Tour
                            </button>
                        </div>
                    </div>
                </div>

                {showEditForm && (
                    <div 
                    className="p-6 space-y-6"
                    style={{
                        marginLeft: "40px",
                        marginRight: "40px",
                        marginTop: "40px",
                        marginBottom: "40px",
                    }}
                    >
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-full">
                                    <label
                                        htmlFor="schedule-name"
                                        className="text-sm font-medium text-gray-900 block mb-2"
                                    >
                                        Schedule Name
                                    </label>
                                    <input
                                        type="text"
                                        name="tour-name"
                                        id="tour-name"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        placeholder="Fill name of schedule"
                                        required
                                        value={scheduleName}
                                        onChange={(e) => setScheduleName(e.target.value)}
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="start-date"
                                        className="text-sm font-medium text-gray-900 block mb-2"
                                    >
                                        Schedule Date
                                    </label>
                                    <input
                                        type="date"
                                        name="schedule-date"
                                        id="schedule-date"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        required
                                        value={scheduleDate}
                                        onChange={(e) => setScheduleDate(e.target.value)}
                                    />
                                </div>

                                <div className="col-span-full">
                                    <label
                                        htmlFor="schedule-detail"
                                        className="text-sm font-medium text-gray-900 block mb-2"
                                    >
                                        Schedule Detail
                                    </label>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={scheduleDetail}
                                        onChange={handleEditorChange}
                                    />
                                </div>
                            </div>
                            <button
                                className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                type='submit'
                                style={{
                                    marginTop: "50px",
                                    paddingLeft: "40px",
                                    paddingRight: "40px"
                                }}
                            >
                                Update schedule
                            </button>
                        </form>
                    </div>
                )}
            </div >

            <Footer />
        </>
    );
};

export default ScheduleList;