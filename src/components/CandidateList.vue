<template>
    <div class="uk-container">
        <nav class="uk-navbar uk-navbar-container uk-background-default-important" uk-navbar>
            
            <div class="uk-navbar-left uk-width-2-3">
                <!-- <router-link to="/candidates" id="logo" class="uk-navbar-item uk-logo"> -->
                <a href="#" @click="to_home">
                    <img :src="require('../assets/images/logo.png')" uk-img width="150"/>
                </a>
                <!-- </router-link> -->
                <form action="javascript:void(0)">
                    <input class="uk-input search-input uk-navbar-left uk-form-width-large" 
                    placeholder="Search" type="text" v-model="search" @keyup.enter="_search()"
                />
                </form>
            </div>
            <div class="uk-navbar-item uk-navbar-right">
                <button class="uk-button uk-button-default uk-navbar-right margin-right-5" type="button">{{currentUser.first_name}}</button>
                <div uk-dropdown>
                    <ul class="uk-nav uk-dropdown-nav">
                        <li class="uk-active"><a href="#" @click="signout">Sign Out</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
    <hr class="uk-margin-remove-top"/>
    <div class="uk-container">
        <div uk-grid>
            <div class="uk-width-1-4@m uk-margin-small-left uk-margin-small-right">
                <form class="uk-text-small">
                    <div class="margin-top-5">
                        <label class="uk-form-label" for="job-title">Job Title</label>
                        <div class="uk-form-controls">
                            <input class="uk-input" id="job-title" placeholder="" type="text"/>
                        </div>
                    </div>
                    <div class="margin-top-5">
                        <label class="uk-form-label" for="location">Location</label>
                        <div class="uk-form-controls">
                            <input class="uk-input" id="location" placeholder="" type="text"/>
                        </div>
                    </div>
                    <div class="margin-top-5">
                        <label class="uk-form-label" for="skills">Skills</label>
                        <div class="uk-form-controls">
                            <input class="uk-input" id="skills" placeholder="" type="text"/>
                        </div>
                    </div>
                    <div class="margin-top-5">
                        <label class="uk-form-label" for="keywords">Keywords</label>
                        <div class="uk-form-controls">
                            <input class="uk-input" id="keywords" placeholder="" type="text"/>
                        </div>
                    </div>
                    <div class="margin-top-10">
                        <label class="uk-form-label margin-top-5" for="experience">Experience</label>
                        <div class="uk-form-controls">
                            <input class="uk-range" id="experience" type="range"/>
                        </div>
                    </div>
                    <div class="margin-top-10">
                        <label class="uk-form-label margin-top-5" for="last-work-period">Last work period</label>
                        <div class="uk-form-controls">
                            <input class="uk-range" id="last-work-period" type="range">
                        </div>
                    </div>
                    <div class="margin-top-10">
                        <div class="uk-form-controls margin-top-5">
                            <input class="uk-checkbox" id="open-to-work" placeholder=""  type="checkbox">
                            <label class="uk-form-label" for="open-to-work">Open to work</label>
                        </div>
                    </div>
                    <div class="uk-flex margin-top-20">
                        <div class="uk-width-1-2 padding-right-5">
                            <button class="uk-button uk-button-default uk-width-1-1" type="reset">Reset</button>
                        </div>
                        <div class="uk-width-1-2 padding-left-5">
                            <button class="uk-button uk-button-primary uk-width-1-1" type="reset">Search</button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="uk-width-expand@m padding-right-15">
                <hr class="uk-hidden@m"/>
                <div uk-alert class="uk-alert-danger" v-if="is_error">
                    <a class="uk-alert-close" uk-close></a>
                    <h3>Internal Server Error 500:</h3>
                    <p>Oops, Something went wrong.</p>
                    <p>The server encountered an internal error or misconfiguration and was unable to complete your request.</p>
                    <p>{{message}}</p>
                </div>
                <div class="uk-flex uk-flex-right">
                    <form class="uk-form">
                        <select class="uk-select uk-form-small" id="form-horizontal-select">
                            <option>Experience ↓</option>
                            <option>Experience ↑</option>
                            <option>Last Work Period ↓</option>
                            <option>Last Work Period ↑</option>
                        </select>
                    </form>
                </div>
                <div class="item padding-left-15 padding-right-15">
    
                    <div class="person-row" v-for="candidate in candidates" :key="candidate.id">
                        <router-link :to="`/candidates/${candidate.id}`" class="candidate-link">
                            <Candidate :candidate_info="candidate" :is_listview=true></Candidate>
                        </router-link>
                        <hr>
                    </div>
                </div>
                <ul class="uk-pagination uk-flex-center" uk-margin>
                    <li>
                        <a href="#" @click="backPage"><span uk-pagination-previous></span></a>
                    </li>
                    <li v-for="pageNumber in Math.ceil(total / perPage)" :key="pageNumber">
                        <a href="#" @click="() => goToPage(pageNumber)"
                            v-if="Math.abs(pageNumber - curPage) < 3 || pageNumber == Math.ceil(total / perPage) - 1 || pageNumber == 0"
                            :class="{
                                current: curPage == pageNumber,
                                last: (pageNumber == Math.ceil(total / perPage) - 1 && Math.abs(pageNumber - curPage) > 3), 
                                first:(pageNumber == 0 && Math.abs(pageNumber - curPage) > 3)
                            }">
                            {{pageNumber}}
                        </a>
                    </li>
                    <li>
                        <a href="#" @click="nextPage"><span uk-pagination-next></span></a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <hr class="margin-top-100"/>

    <Footer></Footer>
</template>

<script>
import UserService from "../services/user.service";
import Footer from './Footer.vue'
import Candidate from './Candidate.vue'
import { useRoute } from 'vue-router'

export default {
  name: 'CandidateList',
  components: {
      Footer,
      Candidate
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  data() {
    return {
        candidates: [],
        curPage: 1,
        perPage: 2,
        total: 0,
        search: "",
        is_error: false,
        message: "",
    };
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
    const route = useRoute();
    if (route.query.perPage) {
        console.log(route.query)
        this.search = route.query.search;
        this.perPage = route.query.perPage;
        this.curPage = route.query.curPage;
    }

    UserService.getCandidates({curPage: this.curPage, perPage: this.perPage, search: this.search}).then(
        (response) => {
            var data = JSON.parse(response.data);
            console.log(data)
            this.candidates = data.candidates;
            this.total = data.total;
            this.is_error = false;
        },
        (error) => {
            this.loading = false;
            this.is_error = true;
            this.message =
                (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();
        }
    )
  },
  methods: {
      to_home() {
            this.$router.push(`/candidates`);
            this.search = "";
            this.perPage = 2;
            this.curPage = 1;
            UserService.getCandidates({curPage: 1, perPage: 2, search: ""}).then(
                (response) => {
                    var data = JSON.parse(response.data);
                    console.log(data)
                    this.candidates = data.candidates;
                    this.total = data.total;
                    this.is_error = false;
                },
                (error) => {
                    this.loading = false;
                    this.is_error = true;
                    this.message =
                        (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                        error.message ||
                        error.toString();
                }
            )
      },
      signout() {
        this.$store.dispatch('auth/logout');
        this.$router.push('/login');
      },
      nextPage() {
        if (this.curPage < Math.ceil(this.total / this.perPage)) {
            this.curPage += 1;
            this.$router.push(`/candidates?search=${this.search}&curPage=${this.curPage}&perPage=${this.perPage}`);
            UserService.getCandidates({curPage: this.curPage, perPage: this.perPage, search: this.search}).then(
                (response) => {
                    var data = JSON.parse(response.data);
                    console.log(data)
                    this.candidates = data.candidates;
                    this.total = data.total;
                    this.is_error = false;
                },
                (error) => {
                    this.loading = false;
                    this.is_error = true;
                    this.message =
                        (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                        error.message ||
                        error.toString();
                    console.log("Unauth: ", error.toString())
                }
            )
        }
      },
      backPage() {
        if (this.curPage > 1) {
            this.curPage -= 1;
            this.$router.push(`/candidates?search=${this.search}&curPage=${this.curPage}&perPage=${this.perPage}`);
            UserService.getCandidates({curPage: this.curPage, perPage: this.perPage, search: this.search}).then(
                (response) => {
                    var data = JSON.parse(response.data);
                    console.log(data)
                    this.candidates = data.candidates;
                    this.total = data.total;
                    this.is_error = false;
                },
                (error) => {
                    this.loading = false;
                    this.is_error = true;
                    this.message =
                        (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                        error.message ||
                        error.toString();
                }
            );
        }
      },
      goToPage(numPage) {
        this.curPage = numPage;
        this.$router.push(`/candidates?search=${this.search}&curPage=${this.curPage}&perPage=${this.perPage}`);
        UserService.getCandidates({curPage: this.curPage, perPage: this.perPage, search: this.search}).then(
            (response) => {
                var data = JSON.parse(response.data);
                console.log(data)
                this.candidates = data.candidates;
                this.total = data.total;
                this.is_error = false;
            },
            (error) => {
                this.loading = false;
                this.is_error = true;
                this.message =
                    (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString();
            }
        )
      },
      _search() {
        this.$router.push(`/candidates?search=${this.search}&curPage=1&perPage=2`);
        UserService.getCandidates({curPage: 1, perPage: 2, search: this.search}).then(
            (response) => {
                var data = JSON.parse(response.data);
                console.log(data)
                this.candidates = data.candidates;
                this.total = data.total;
                this.is_error = false;
            },
            (error) => {
                this.loading = false;
                this.is_error = true;
                this.message =
                    (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString();
            }
        )
      }
  },
};
</script>
<style>
    .candidate-link:hover {
        text-decoration: none;
    }
    
    a.first::after {
        content:'...'
    }

    a.last::before {
        content:'...'
    }
    .current {
       color: red;
    }
</style>
