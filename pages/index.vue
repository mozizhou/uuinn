<template>
 <PartHero></PartHero>
  <PartInstantly></PartInstantly>
  <PartUsersSaying></PartUsersSaying>
  <PartFaq></PartFaq>
  <PartUserStart></PartUserStart>
  <PartJoin></PartJoin>
  <PartBlog></PartBlog>
</template>

<script>
import {defineComponent} from "vue";
import PartHero from "~/components/common/part-hero.vue";
import PartInstantly from "~/components/common/part-instantly.vue";
import PartUsersSaying from "~/components/common/part-users-saying.vue";
import PartFaq from "~/components/common/part-faq.vue";
import PartUserStart from "~/components/common/part-user-start.vue";
import PartJoin from "~/components/common/part-join.vue";
import PartBlog from "~/components/common/part-blog.vue";

export default defineComponent({
  components: {PartBlog, PartJoin, PartUserStart, PartFaq, PartUsersSaying, PartInstantly, PartHero}
})
</script>

<style scoped>

</style>