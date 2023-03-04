import { useNavigate, useParams } from 'react-router-dom'
import { ChevronLeft } from '../../assets'
import Footer from '../../component/navigation/footer'
import ReactPlayer from 'react-player'
import { useEffect, useRef, useState } from 'react'
import { ClockIcon, PlayIcon } from '@heroicons/react/20/solid'
import CourseSection from '../Course/sections/course_section'
import global_variables from '../../mixing/urls'
import { Services } from '../../mixing/services'
import localforage from 'localforage'
import { displayErrMsg } from '../../component/alerts/alerts'
import logout_and_redirect from '../../component/hoc/logout-redirect'
import Skeleton from '@mui/material/Skeleton'
import AboutAuthor from '../Course/sections/about_the_author'
import { Tab } from '@headlessui/react'
import CourseInformation from '../Course/sections/course_information'
import Reviews from '../Course/sections/reviews'
import CircularProgress from '@mui/material/CircularProgress'
import { duration } from 'moment'

const MyCourseDetail = () => {
  const navigate = useNavigate()
  const { courseid } = useParams()

  const [loading, setLoading] = useState(true)
  const [course, setCourse] = useState([])
  const [instructor, setInstructor] = useState([])
  const [review, setReviews] = useState([])
  const [reviewLoading, setreviewLoading] = useState(true)
  const [videos, setVideos] = useState([])
  const [sections, setSections] = useState([])
  const [currentSection, setCurrentSection] = useState(0)

  const getCourseDetail = async () => {
    setLoading(true)

    try {
      const res = await (
        await Services()
      ).get(
        global_variables().getCourses +
          `/${courseid}?query_fields=title,status,about,caption,short_description,description,about,skill_level,language,price,caption,instructor,configurations,certificate,contract_percentage,status,view_status,updatedAt,thumbnail`
      )
      // console.log(res.data.data);
      setCourse(res.data?.data)

      const token = await localforage.getItem('token')

      if (token !== null) {
        try {
          const instructor_res = await (
            await Services()
          ).get(global_variables().getUser + `/${res?.data?.data?.instructor}`)
          // console.log(instructor_res.data?.data);
          setInstructor(instructor_res.data?.data)
          setLoading(false)
        } catch (error) {
          if (error.response?.status === 401) {
            logout_and_redirect()
          } else {
            displayErrMsg(error.response?.data?.message, () => {
              navigate(-1)
            })
          }
        }
      } else {
        setLoading(false)
      }
    } catch (err) {
      // console.log(err);
      // console.log(err.response?.data?.message);
      setLoading(true)
      displayErrMsg(err.response?.data?.message, () => {
        navigate(-1)
      })
    }
  }

  const getReviews = async () => {
    const token = await localforage.getItem('token')
    setreviewLoading(true)
    if (token !== null) {
      try {
        const reviewres = await (
          await Services()
        ).get(global_variables().getReviews + `?course_id=${courseid}`)

        setReviews(reviewres.data?.data?.data)
        setreviewLoading(false)
      } catch (er) {
        setreviewLoading(false)
      }
    }
  }

  const getVideos = async () => {
    const user = await localforage.getItem('userdata')
    try {
      const res = await (
        await Services()
      ).get(
        global_variables().getCourses + `/${courseid}/users/${user.user_id}`
        // `/users/9c5a1da9f779441d84f06168ccf0574b`
      )

      setVideos(res.data?.data?.videos)
      console.log(res.data?.data)
      setSections(res.data?.data?.sections)
      // console.log(keys);
      // console.log(res.data?.data?.videos[keys[0]]);
    } catch (error) {
      console.log(error)
    }
  }

  const playerRef = useRef(null)
  const handleJumpToTime = time => {
    const timetosecs = time * 60
    playerRef.current.seekTo(timetosecs) // jump to 1 minute (60 seconds) in the video
  }

  useEffect(() => {
    getCourseDetail()
    getVideos()
  }, [])

  return (
    <>
      <div className='bg-secondary-600 w-full py-6 px-4 flex gap-3'>
        <button onClick={() => (window.location.href = '/my-course')}>
          <ChevronLeft />
        </button>
        <p className='text-white text-lg'>
          {loading ? <Skeleton width={600} height={30} /> : course.title}
        </p>
        {/* <p className='text-white text-lg'>
          {JSON.stringify()}
        </p> */}
      </div>
      {loading ? (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999
          }}
        >
          <CircularProgress size={80} color='primary' />
        </div>
      ) : (
        <div style={{ minHeight: '100vh' }}>
          <div className='flex flex-wrap'>
            <div className='w-full md:w-8/12'>
              {sections.length !== 0 ? (
                <ReactPlayer
                  url={
                    sections.length === 0
                      ? null
                      : videos[sections[currentSection]?.section_id][0]?.url
                  }
                  ref={playerRef}
                  controls
                  width='100%'
                  height='100%'
                  loop={true}
                  light={course.thumbnail}
                  playIcon={
                    <PlayIcon
                      className='w-20 h-20 my-40'
                      style={{ color: 'white' }}
                    />
                  }
                  config={{
                    file: {
                      attributes: {
                        controlsList: 'nodownload'
                      }
                    }
                  }}
                />
              ) : (
                <p className='text-center mt-10'>
                  No video available for this course, Please contact course
                  instructor for more information
                </p>
              )}
            </div>
            <div className='w-full md:w-4/12'>
              {/* <CourseSection courseid={courseid} lock={false} /> */}
              <div className='px-4 py-3 bg-white'>
                <p className='text-secondary-600 text-lg'>Course content</p>
              </div>
              <hr className='my-1 mx-5 border-t border-secondary-400' />
              <div
                className='px-4 pt-4 pb-2 text-sm text-secondary-500'
                style={{ maxHeight: '250px', overflowY: 'scroll' }}
              >
                {sections.map((_sections, index) => {
                  return (
                    <div key={index}>
                      <div className='flex mb-3 ml-5'>
                        <PlayIcon
                          className='w-7 h-7 mr-2 cursor-pointer'
                          onClick={() => {
                            setCurrentSection(index)
                          }}
                        />
                        <div className='flex flex-col'>
                          <p className='text-lg'>{_sections.name}</p>
                          <div className='flex '>
                            <ClockIcon className='w-4 h-4' />
                            <p className='ml-0 text-sm'>
                              watching order: {_sections.position}
                            </p>
                          </div>
                        </div>
                      </div>
                      <hr className='mx-20 mt-0 mb-2' />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <Tab.Group>
            <Tab.List className='flex overflow-x-scroll'>
              <Tab className='px-6 py-3 flex justify-center items-center cursor-pointer md:border-b-0 border-b border-primary-300 '>
                Overview
              </Tab>
              <Tab className='px-6 py-3 flex justify-center items-center cursor-pointer md:border-b-0 border-b border-primary-300'>
                Reviews
              </Tab>
              <Tab className='px-6 py-3 flex justify-center items-center cursor-pointer md:border-b-0 border-b border-primary-300'>
                Author
              </Tab>
              <Tab className='px-6 py-3 flex justify-center items-center cursor-pointer md:border-b-0 border-b border-primary-300'>
                FAQ
              </Tab>
              <Tab className='px-6 py-3 flex justify-center items-center cursor-pointer md:border-b-0 border-b border-primary-300'>
                Notes
              </Tab>
            </Tab.List>
            <div className='grid md:grid-cols-12 grid-cols-1'>
              <div className='col-span-9'>
                <div className='md:px-24 px-4 py-4'>
                  <Tab.Panels>
                    <Tab.Panel>
                      <CourseInformation course={course} />
                    </Tab.Panel>
                    <Tab.Panel>
                      <div className='py-3 item-center flex flex-col justify-center'>
                        <p className='text-secondary-600 font-bold text-lg'>
                          Reviews
                        </p>
                        <Reviews
                          loading={reviewLoading}
                          reviews={review}
                          courseid={course.course_id}
                          reload={getReviews}
                          allow={true}
                        />
                      </div>
                    </Tab.Panel>
                    <Tab.Panel>
                      <AboutAuthor
                        instructor={instructor}
                        instructor_id={course.instructor}
                        courseid={courseid}
                      />
                    </Tab.Panel>
                    <Tab.Panel>FAQ</Tab.Panel>
                    <Tab.Panel>Notes</Tab.Panel>
                  </Tab.Panels>
                </div>
              </div>
            </div>
          </Tab.Group>
        </div>
      )}

      <Footer />
    </>
  )
}

export default MyCourseDetail
