import {Link} from 'react-router-dom';
function ErrorPage() {
    return (
    <div class="text-center error-page flex flex-col align-items-center justify-center">
      <h1
        class="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400 drop-shadow-lg"
      >
        404
      </h1>
      <p class="mt-4 text-3xl font-semibold text-gray-800">
        Không tìm thấy trang
      </p>
      <p class="mt-2 text-lg text-gray-600">
        Trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
      </p>
      <Link
        to="/"  
        href="/"
        class="mt-6 inline-block px-6 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition duration-300 shadow-md"
      >
        Quay về lại trang chủ
      </Link>
    </div>
    );
}
export default ErrorPage;