<template>
    <div class="uk-container">
        <nav class="uk-navbar uk-navbar-container uk-background-default-important" uk-navbar>
            
            <div class="uk-navbar-left uk-width-2-3">
                <a href="#" @click="to_home">
                    <img :src="require('../assets/images/logo.png')" uk-img width="150"/>
                </a>
                <form action="javascript:void(0)">
                    <input class="uk-input search-input uk-navbar-left uk-form-width-large" 
                    placeholder="Search" type="text" v-model="search" 
                    @keyup.enter="_search()"
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

    <div class="uk-container uk-container-small">
        <div uk-grid>
            <div class="uk-width-expand@m padding-right-15">
                <div class="uk-flex">
                    <!-- <router-link :to="`/candidates`" class="candidate-link"> -->
                        <span uk-icon="icon: arrow-left; ratio: 1.5" @click="back"></span>
                    <!-- </router-link> -->
                </div>
                <div class="item padding-left-15 padding-right-15" v-if="!is_error">
                    <Candidate :candidate_info="candidate" :is_listview=false></Candidate>
                </div>
                <div uk-alert class="uk-alert-danger" v-if="is_error">
                    <a class="uk-alert-close" uk-close></a>
                    <h3>Profile not found</h3>
                    <p>Oops, Something went wrong.</p>
                    <!-- <p>The server encountered an internal error or misconfiguration and was unable to complete your request.</p>
                    <p>{{error_message}}</p> -->
                </div>
            </div>
        </div>
    </div>
    <Footer></Footer>
</template>
<script>
import Footer from './Footer.vue'
import Candidate from './Candidate.vue'
import UserService from "../services/user.service";

export default {
    name: 'Detail',
    components: {
        Footer,
        Candidate
    },
    props:{
        candidate_id: String
    },
    computed: {
        currentUser() {
            console.log("current USER: ", this.$store.state.auth.user);
            return this.$store.state.auth.user;
        }
    },
    data() {
        return {
            candidate: {},
            search: "",
            is_error: false
        };
    },
    mounted() {
        if (!this.currentUser) {
            this.$router.push('/login');
        }

        UserService.getCandidate(this.$props.candidate_id).then(
            (response) => {
                this.candidate = JSON.parse(response.data);
                console.log(this.candidate)
            },
            (error) => {
                this.is_error = true;
                this.error_message =
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
        _search() {
            this.$router.push(`/candidates?search=${this.search}&curPage=1&perPage=2`);
            UserService.getCandidates({curPage: 1, perPage: 2, search: this.search}).then((response) => {
                var data = JSON.parse(response.data);
                console.log(data)
                this.candidates = data.candidates;
                this.total = data.total;
            })
        },
        back() {
            console.log("back page");
            this.$router.go(-1);
        }
    }
}
</script>
