import Vue from 'vue'
import { Button } from 'vant';
import { Swipe, SwipeItem } from 'vant';
import { Image } from 'vant';
import { Icon } from 'vant';
import { Lazyload } from 'vant';
import { List } from 'vant';
import { Search } from 'vant';
import { DropdownMenu, DropdownItem } from 'vant';
import { Overlay } from 'vant';
import { Loading } from 'vant';
import { Sticky } from 'vant';

Vue.use(Sticky);
Vue.use(Loading);
Vue.use(Overlay);
Vue.use(DropdownMenu).use(DropdownItem);
Vue.use(Search);
Vue.use(List);
Vue.use(Lazyload);
Vue.use(Icon);
Vue.use(Image);
Vue.use(Button);
Vue.use(Swipe).use(SwipeItem);