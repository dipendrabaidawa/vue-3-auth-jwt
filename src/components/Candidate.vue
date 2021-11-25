<template>
      <div class="uk-flex uk-flex-left@l profile-overview">
          <img alt="avatar" class="uk-border-circle" height="100" :src="require('../assets/images/avatar.jpeg')" width="100"/>
          <div class="uk-flex uk-flex-column uk-width-1-1 profile-details">
              <div class="padding-left-10">
                  <h3 class="uk-margin-remove uk-text-secondary uk-text-large">
                      <b> {{candidate_info.full_name}} </b>
                  </h3>
              </div>
              <div class="padding-left-13 current-position">
                  <h4 class="uk-margin-remove uk-text-secondary uk-text-medium">
                      {{candidate_info.title}}
                  </h4>
              </div>
              <div class="padding-left-8">
                  <div class="uk-flex margin-top-5">
                      <div>
                          <span uk-icon="icon: location"></span> <span class="uk-text-small"> {{candidate_info.location}} </span>
                      </div>
                      <div class="uk-margin-medium-left">
                            <span class="uk-text-secondary">
                                <b><span class="uk-text-success"> 5y 3m </span> / 8y 1m</b>
                            </span>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <div class="uk-flex uk-flex-left@l uk-margin-top social-icons" v-if="!is_listview">
          <img alt="email" class="img-icons" :src="require('../assets/images/email-icon.png')"/>
          <img alt="linkedIn" class="margin-left-5 img-icons" :src="require('../assets/images/linkedin-icon.png')"/>
          <img alt="skype" class="margin-left-5 img-icons" :src="require('../assets/images/skype-icon.png')"/>
          <img alt="facebook" class="margin-left-5 img-icons" :src="require('../assets/images/facebook-icon.png')"/>
          <img alt="telegram" class="margin-left-5 img-icons" :src="require('../assets/images/telegram-icon.png')"/>
          <img alt="github" class="margin-left-5 img-icons" :src="require('../assets/images/github-icon.png')"/>
          <img alt="instagram" class="margin-left-5 img-icons" :src="require('../assets/images/instagram-icon.png')"/>
          <img alt="phone" class="margin-left-5 img-icons" :src="require('../assets/images/phone-icon.png')"/>
      </div>
      <div class="uk-flex uk-flex-left@l uk-margin-top" v-if="!is_listview">
          <p class="uk-text-secondary description">
              {{candidate_info.about}}
          </p>
      </div>
      <section>
            <div class="uk-flex uk-flex-left@l" v-if="!is_listview">
                <h4 class="uk-text-secondary uk-margin-remove-bottom">
                    <b>Skills:</b>
                </h4>
            </div>
            <div class="uk-flex uk-flex-left@l">
                <div class="skills-info uk-margin-top">
                    <a class=" uk-button uk-button-default uk-button-xs uk-border-rounded padding-left-10 padding-right-10 "
                    v-for="skill in candidate_info.skills" :key="skill.skill_name">{{skill.skill_name}}</a>
                </div>
            </div>
      </section>
      <section>
          <div class="uk-flex uk-flex-left@l uk-margin-top" v-if="!is_listview">
              <h4 class="uk-text-secondary uk-margin-remove-bottom"><b>Experience:</b></h4>
          </div>
          <div class="experience uk-flex uk-flex-left@l justify-content-between margin-top-5" v-for="exp in candidate_info.exp" :key="exp.company">
              <div class="uk-width-expand">
                  <span class="uk-text-success"> <b> {{exp.title}} </b> </span>
                  <span class="uk-margin-small-left uk-text-secondary">at {{exp.company}}</span>
                  <span class="uk-text-secondary">  ({{exp.location}})</span>
                  <p class="text-pr2 padding-left-10 margin-top-5" v-if="!is_listview">
                      {{exp.notes}}
                  </p>
              </div>
              <div class="uk-width-auto">
                  <span class="uk-text-small">({{exp.start.substring(0, 10)}} - {{exp.finish.substring(0, 10)}})</span>
                  <span class="uk-text-small"><b>{{getPeriod(exp.start, exp.finish)}}</b></span>
              </div>
          </div>
      </section>
      <br>
      <section>
          <div class="uk-flex uk-flex-left@l uk-margin-top" v-if="!is_listview">
              <h4 class="uk-text-secondary uk-margin-remove-bottom"><b>Education:</b></h4>
          </div>
          <div class="uk-flex uk-flex-left@l justify-content-between education" v-for="edu in candidate_info.educations" :key="edu.institution_name">
              <div>
                  <span class="uk-text-secondary">{{edu.institution_name}} | {{edu.location}}</span>
              </div>
              <div>
                  <span class="uk-text-small">({{edu.start.substring(0, 10)}} - {{edu.finish.substring(0, 10)}})</span>
              </div>
          </div>
      </section>
</template>

<script>

export default {
  name: "Candidate",
  props: ["candidate_info", "is_listview"],
  methods: {
      getPeriod(start, end) {
          var date1 = new Date(start), date2 = new Date(end);
          var diffInMs = Math.abs(date2 - date1);
          
          var   yrs = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 365)),
                mos = Math.floor((diffInMs % (1000 * 60 * 60 * 24 * 365))/(1000 * 60 * 60 * 24 *30)),
                dys = Math.floor(diffInMs % (1000 * 60 * 60 * 24 *30));
          return (yrs > 0 ? `${yrs}ys`: "") + (mos > 0 ? `${mos}ms`: "--ms") + ((dys > 0 && yrs<1)? `${dys}ds`: "")
      }
  }
};
</script>