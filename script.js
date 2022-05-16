import 'regenerator-runtime/runtime';
import axios from 'axios';

const timestampToDate = (ts) => {
  var d = new Date(ts * 1000);
  console.log(d.toGMTString());
  // d.setTime(ts);
  // return ('0' + d.getDate()).slice(-2) + '.' + ('0' + (d.getMonth() + 1)).slice(-2) + '.' + d.getFullYear();
}
window.onload = function () {
  VK.init({
    apiId: 8156808
  });
  VK.Auth.getLoginStatus((res) => {
    if (res.session) {
    }
  })
  const buttonlogin = document.querySelector('.login');
  const buttonlogout = document.querySelector('.logout');
  const buttonGetGroups = document.querySelector('.getGroups');
  const buttonGetWall = document.querySelector('.getWall');
  buttonGetGroups.addEventListener('click', () => {
    VK.Api.call('groups.search', { q: 'Бродяги', count: 100, v: '5.81' }, (r) => {
      if (r.response) {
        const { items } = r.response;
        const item = items[0];
        const idGroup = item.id;
        VK.Api.call('wall.get', { v: '5.81', owner_id: Number(`-${idGroup}`), count: 100 }, (r) => {
          console.log(r);
          if (r) {
            const { items } = r.response;
            const lastPost = timestampToDate(items[99].date)
            console.log(lastPost);
            console.log(`https://vk.com/wall-${idGroup}_${items[99].id}`);
            // console.log(items);
            // const filterByLikes = items?.sort((prevPost, newPost) => {
            //   if (prevPost.likes.count < newPost.likes.count) return 1;
            //   if (prevPost.likes.count > newPost.likes.count) return -1;
            //   return 0;
            // }).slice(0,10);

            // const filterByViews = items?.sort((prevPost, newPost) => {
            //   if (prevPost.views.count < newPost.views.count) return 1;
            //   if (prevPost.views.count > newPost.views.count) return -1;
            //   return 0;
            // }).slice(0,10);

            // console.log(filterByLikes);
          } 
        })
      }
      // if (r.response) {
      //   alert('Привет, ' + r.response[0].first_name);
      // }
    });
  })
  buttonGetWall.addEventListener('click', () => {
    VK.Api.call('users.get', {v: '5.81'}, (res) => {
      if (res) {
        const {id} = res.response[0];
        console.log(id);
        VK.Api.call('wall.search', {v: '5.81', owner_id: `${id}`}, (rs) => {
          console.log(rs);
        })
      }
    })
  })
  buttonlogin.addEventListener('click', async () => {
    VK.Auth.login()
  })

  buttonlogout.addEventListener('click', async () => {
    VK.Auth.logout()
  })
};