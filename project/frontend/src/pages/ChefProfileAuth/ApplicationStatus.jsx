import React from "react";
import { Link } from "react-router-dom"; // استخدام Link للانتقال إلى صفحة الهوم

const ApplicationStatus = ({ applicationStatus }) => {
  if (applicationStatus === "Accept") {
    return (
      <div className="text-center mt-4">
        <h2 className="text-green-500 font-bold text-2xl">تهانينا! تم قبول طلبك.</h2>
        <Link
          to="/" 
          className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          اذهب إلى صفحة الهوم
        </Link>
      </div>
    );
  } else if (applicationStatus === "Reject") {
    return (
      <div className="text-center mt-4">
        <h2 className="text-red-500 font-bold text-2xl">عذراً، تم رفض طلبك.</h2>
      </div>
    );
  } else if (applicationStatus === "pending") {
    return (
      <div className="text-center mt-4">
        <h2 className="text-yellow-500 font-bold text-2xl">طلبك قيد المراجعة.</h2>
      </div>
    );
  } else {
    return null;
  }
};

export default ApplicationStatus;
