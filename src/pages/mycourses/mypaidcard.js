import { Typography, Grid, Card, CardContent } from "@mui/material";
import { ArrowRight } from "@mui/icons-material";

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
    "&:hover": {
      transform: "translateY(-2px)",
    },
  },
  courseCardContent: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  courseImage: {
    marginBottom: 16,
  },
  courseTitle: {
    fontSize: 24,
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
          Instructor: {course.instructor} <br />
          Language: {course.language} <br />
          Skill Level: {course.skill_level}
        </Typography>
        <hr />
        <Typography style={styles.courseDescription}>
          {course.description}
        </Typography>
        <div style={styles.courseButton}>
          View Course <ArrowRight />
        </div>
      </CardContent>
    </Card>
  );
};

export default PaidCourseCard;
