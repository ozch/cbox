export default function isSuper() {
    let user = JSON.parse(localStorage.getItem("user"))
    if(!user){
      return false
    }
    return user.is_super || user.is_superuser
}