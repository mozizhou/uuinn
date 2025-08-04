<template>
  <PartHero></PartHero>
  <PartInstantly></PartInstantly>
  <PartUsersSaying></PartUsersSaying>
  <PartFaq></PartFaq>
  <PartUserStart></PartUserStart>
  <PartJoin></PartJoin>
  <PartBlog></PartBlog>
  <Footer></Footer>
</template>

<script>
import {defineComponent} from "vue";
import PartHero from "~/components/part-hero.vue";
import PartInstantly from "~/components/part-instantly.vue";
import PartUsersSaying from "~/components/part-users-saying.vue";
import PartFaq from "~/components/part-faq.vue";
import PartUserStart from "~/components/part-user-start.vue";
import PartJoin from "~/components/part-join.vue";
import PartBlog from "~/components/part-blog.vue";
import Footer from "~/components/layout/Footer.vue";

export default defineComponent({
  components: {Footer, PartBlog, PartJoin, PartUserStart, PartFaq, PartUsersSaying, PartInstantly, PartHero}
})
</script>

<style scoped>

</style>