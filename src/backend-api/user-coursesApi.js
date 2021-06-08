import {commonApi} from './common';

const UserCoursesAPI = {
    getUserCourses() {
        return commonApi.perform('get', '/user-course');
    },
    updateUserCourse(userCourse) {
        return commonApi.perform('patch', '/user-course', userCourse);
    },
    addUserCourse(userCourse) {
        return commonApi.perform('post', '/user-course', userCourse);
    },
};

export default UserCoursesAPI;