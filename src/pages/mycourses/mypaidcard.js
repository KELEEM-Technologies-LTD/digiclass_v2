import { Typography, Card, CardContent } from "@mui/material";
import { ArrowRight } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import localforage from "localforage";
import { Services } from "../../mixing/services";
import global_variables from "../../mixing/urls";
import ProgressBar from "./progress_bar";
import InstructorName from "./get_instructor_name";

const styles = {
  root: {
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 24,
  },
  courseCard: {
    cursor: "pointer",
    transition: "transform 0.3s ease-in-out",
    // maxHeight: "520px",
    minHeight: "520px",
    "&:hover": {
      transform: "translateY(-2px)",
    },
  },
  courseCardContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "520px",
  },
  courseImage: {
    marginBottom: 16,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  courseInstructor: {
    color: "#6B7280",
  },
  courseDescription: {
    marginTop: "auto",
  },
  courseButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    backgroundColor: "#3B82F6",
    color: "#FFFFFF",
    borderRadius: 4,
    padding: "8px 16px",
    transition: "background-color 0.3s ease-in-out",
    "&:hover": {
      backgroundColor: "#2563EB",
    },
  },
};

const PaidCourseCard = ({ course }) => {
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // console.log(course);
    getCourseSections();
    getCourseProgress();
  }, []);

  const getCourseSections = async () => {
    const course_id = course.course_id;
    const user = await localforage.getItem("userdata");
    try {
      const res = await (
        await Services()
      ).get(
        global_variables().getCourses + `/${course_id}/users/${user.user_id}`
      );

      // console.log(res.data?.data?.sections?.length);
      setTotal(res.data?.data?.sections?.length);
    } catch (error) {
      // console.log(error);
    }
  };

  const getCourseProgress = async () => {
    const user = await localforage.getItem("userdata");
    const course_id = course.course_id;
    const user_id = user.user_id;

    try {
      const res = await (
        await Services()
      ).get(
        global_variables().getAllCompletedSections + `/${user_id}/${course_id}`
      );
      // console.log(res.data.payload?.length);
      setCompleted(res.data?.payload?.length);
    } catch (error) {
      // console.log(error);
    }
  };

  // console.log(course);
  return (
    <Card style={styles.courseCard} onClick={() => {}}>
      <CardContent style={styles.courseCardContent}>
        <img
          src={course.thumbnail}
          alt={course.title}
          style={styles.courseImage}
        />
        <Typography style={styles.courseTitle}>{course.title}</Typography>
        <Typography style={styles.courseInstructor}>
          Instructor: <InstructorName instructor={course.instructor} /> <br />
          Language: {course.language} <br />
          Skill Level: {course.skill_level}
        </Typography>
        {/* {completed} / {total} */}
        <ProgressBar total={total} completed={completed} />
        <Typography style={styles.courseDescription}>
          {course.short_description}
        </Typography>
        <div
          className="mt-auto"
          style={styles.courseButton}
          onClick={() => navigate(`/my-course/${course.course_id}`)}
        >
          View Course <ArrowRight />
        </div>
      </CardContent>
    </Card>
  );
};

export default PaidCourseCard;
