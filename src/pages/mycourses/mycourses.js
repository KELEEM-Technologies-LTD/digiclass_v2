import localforage from "localforage";
import { useEffect, useState } from "react";
import { Services } from "../../mixing/services";
import global_variables from "../../mixing/urls";
import Footer from "./../../component/navigation/footer";
import NavigationBar from "./../../component/navigation/public_navigation_bar";
import React from "react";
import { Typography, Grid, Skeleton } from "@mui/material";
import PaidCourseCard from "./mypaidcard";

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

const MyCourses = () => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  const getmypaid = async () => {
    setLoading(true);
    const userdata = await localforage.getItem("userdata");
    // console.log(userdata);
    try {
      const res = await (
        await Services()
      ).get(global_variables().getmypaidc + `/${userdata.user_id}`);

      // console.log(res.data.payload[0]);
      setLoading(false);
      setCourses(res.data.payload);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getmypaid();
  }, []);

  return (
    <>
      <NavigationBar />
      <div className="flex flex-col font-serif">
        {/* main content */}
        <div className="mt-12 md:px-16 px-3">
          <div style={styles.root}>
            <Typography style={styles.title}>My Courses</Typography>
            <Grid container spacing={4}>
              {loading ? (
                <Grid item xs={12} sm={6} md={4}>
                  <Skeleton>
                    <PaidCourseCard
                      course={{
                        id: 1,
                        title: "Introduction to Programming",
                        instructor: "John Doe",
                        description:
                          "Learn the fundamentals of programming and build your own applications.",
                        thumbnail: "https://picsum.photos/id/237/300/200",
                      }}
                    />
                  </Skeleton>
                </Grid>
              ) : courses.length === 0 ? (
                <>
                  <Grid item md={12}>
                    <Typography
                      style={styles.courseTitle}
                      className="text-center"
                    >
                      You have not purchased any course from DigiClass
                    </Typography>
                  </Grid>
                </>
              ) : (
                courses.map((course, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <PaidCourseCard course={course} />
                  </Grid>
                ))
              )}
            </Grid>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default MyCourses;
