import Api from './Api.js'

export default {

  login(user) {
    return Api().post('auth/login', user)
  },
  signup(user) {
    return Api().post('auth/signup', user)
  },
  logout() {
    return Api().get('auth/logout')
  },
  getUsers() {

    return Api().get('protected/getUsers', {
      headers: { Authorization: localStorage.getItem("token") }
    }).catch(() => {
      const res = {
        status: 401,
      }
      return res;
    })

  },
  getUser(id) {
    return Api().post('protected/getUser', id, {
      headers: { Authorization: localStorage.getItem("token") },
    })
  },
  updateEntry(a) {

    return Api().put('protected/update', a, {
      headers: { Authorization: localStorage.getItem("token") },
    })
  },
  updateFeedback(a) {

    return Api().put('protected/feedback', a, {
      headers: { Authorization: localStorage.getItem("token") },
    })
  },
  upload(formdata) {
    return Api().post('upload', formdata, {
      headers: { Authorization: localStorage.getItem("token") },
    })
  },
  addround(round) {
    return Api().post('addRound', round, {
      headers: { Authorization: localStorage.getItem("token") },
    })

  },
  getAuditionStatus() {
    return Api().get('auditionstatus')
  },

  changeRole(id) {
    return Api().put('protected/changerole', id, {
      headers: { Authorization: localStorage.getItem("token") },
    })
  },
  editQues(id) {
    return Api().put('/editquestion', id, {
      headers: { Authorization: localStorage.getItem("token") },
    })
  },

  setClearance(id) {
    return Api().put('protected/setclearance', id, {
      headers: { Authorization: localStorage.getItem("token") },
    })
  },
  pushRound() {
    return Api().post('protected/pushround', null, {
      headers: { Authorization: localStorage.getItem("token") },
    })
  },
  addQues(q) {
    return Api().post('/addQuestion', q, {
      headers: { Authorization: localStorage.getItem("token") },
    })

  },
  stopRound() {
    return Api().post('protected/stopround', null, {
      headers: { Authorization: localStorage.getItem("token") },
    })
  },

  pushResult() {
    return Api().post('protected/pushresult', null, {
      headers: { Authorization: localStorage.getItem("token") },
    })
  },

  getstudentRound() {
    return Api().get('student/getRound', {
      headers: { Authorization: localStorage.getItem("token") }

    })
  },
  getRounds() {
    return Api().get('getRounds', {
      headers: { Authorization: localStorage.getItem("token") }

    })
  },
  updateAnswer(payload) {
    return Api().put('/student/answer', payload, {
      headers: { Authorization: localStorage.getItem("token") }

    })
  },
  submitRound(payload) {
    return Api().put('/student/answerround', payload, {
      headers: { Authorization: localStorage.getItem("token") }
    })
  },
  deleteQues(id){
    return Api().delete('/removeQuestion', {
      headers: { Authorization: localStorage.getItem("token") },
      data:id
    })
  },
  result() {
    return Api().get('/result', {
      headers: { Authorization: localStorage.getItem("token") }
    })
  },
  deleteRound(id) {
    return Api().delete('removeRound', {
      headers: { Authorization: localStorage.getItem("token") },
      data:id
    })
  },
  getStudent() {
    return Api().get('/student/get', {
      headers: { Authorization: localStorage.getItem("token") }
    })
  },
  updateRound(round) {
    return Api().put('updateRound', round, {
      headers: { Authorization: localStorage.getItem("token") }
    })
  },
  getAnswers() {
    return Api().get("student/getAnswers", {
      headers: { Authorization: localStorage.getItem("token") }
    })
  },
  getProfile() {
    return Api().get("profile", {
      headers: { Authorization: localStorage.getItem("token") }
    })
  },
  extendtime(id) {
    return Api().put("protected/extendtime",id, {
      headers: { Authorization: localStorage.getItem("token") }
    })
  },
  setProfile(profile) {
    return Api().post("profile", profile,  {
      headers: { Authorization: localStorage.getItem("token") }
    })
  },
  wildcard(id) {
    return Api().post("/wildcard", { uuid: id }, {
      headers: { Authorization: localStorage.getItem("token") }
    })
  }
}