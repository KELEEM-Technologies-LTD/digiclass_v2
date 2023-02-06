import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CourseSpinner = () => {
  return (
    <div>
      <Skeleton height={150} className='mb-4' />
      <Skeleton height={20} width='70%' className="mb-2" />
      <Skeleton height={20} width='20%' />
    </div>
  );
};

export default CourseSpinner;
