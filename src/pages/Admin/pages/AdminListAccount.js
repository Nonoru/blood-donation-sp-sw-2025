// File: AdminListAccount.js
import React from "react";
import "../styles/AdminListAccount.scss";

const AdminListAccount = () => {
  return (
    <div className="list-account-page">
      <div className="account-container">
        <div className="header-action">
          <h3>Danh sách tài khoản</h3>
          <button className="btn-add">➕ Thêm mới</button>
        </div>

        <table className="account-table">
          <thead>
            <tr>
              <th>Mã tài khoản</th>
              <th>Tên tài khoản</th>
              <th>Email</th>
              <th>Vai trò</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>tuanngu</td>
              <td>tuan123@gmail.com</td>
              <td>User</td>
            </tr>
            <tr>
              <td>2</td>
              <td>tuanxoalqdituanxoalqdi</td>
              <td>tuan3@gmail.com</td>
              <td>Staff</td>
            </tr>
          </tbody>
        </table>

        <div className="footer-pagination">
          <ul className="pagination">
            <li><button>«</button></li>
            <li><button>‹</button></li>
            <li><button className="active">1</button></li>
            <li><button>›</button></li>
            <li><button>»</button></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminListAccount;
