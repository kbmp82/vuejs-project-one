<template>
  <div id="edit-smoothie" class="edit-smoothie container">
<h2>Edit {{ smoothieTitle }}</h2>
<form @submit.prevent="updateSmoothie">
  <div class="field title" v-if="smoothie.title">
    <label for="title">Smoothie Title:</label>
    <input type="text" name="title" v-model="smoothie.title">
  </div>
  <div v-for="(ing, index) in smoothie.ingredients" :key="index" class="field">
  <label for="ingredient">Ingredients</label>
  <input type="text" name="ingredient" v-model="smoothie.ingredients[index]">
  <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
  </div>
  <div class="field add-ingredient">
    <label for="add-ingredient">Add Ingredient (press TAB to add multiple):</label>
    <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another">
  </div>
  <div class="field center-align">
    <p v-if="feedback" class="red-text">{{ feedback }}</p>
    <button class="btn pink" name="button">Update Smoothie</button>
  </div>

</form>
  </div>
</template>
<script>
import db from '@/firebase/init';
export default {
  name: "EditSmoothie",
  data () {
return{
  smoothieTitle: _.startCase(this.$route.params.smoothie_slug),
  smoothie: null,
  another: null,
  feedback: null,
  title: 'hello'
}
},
methods: {
  updateSmoothie(){
    if(this.smoothie.title && this.smoothie.ingredients){
      const title = _.startCase(this.smoothie.title);
      const slug = _.kebabCase(_.toLower(this.smoothie.title.replace(/[^A-Z0-9]/ig, '-')));

      db.collection('smoothies').doc(this.smoothie.id).update({
      title: title,
      slug: slug,
      ingredients: this.smoothie.ingredients
      })
      .then(() => {
        this.$router.push({name: 'Index'});
      }).catch(err =>{
        console.log(err);
      })
    }else{
    this.feedback= 'please enter all fields';
    }
  },
  addIng(){
    if(this.another && !this.smoothie.ingredients.includes(this.another)){
      this.smoothie.ingredients.push(_.upperFirst(this.another));
      this.another = null;
      this.feedback = null;
      //console.log(this.ingredients);
    }else{
      this.feedback ='ingredient already exists or is blank';
    }
  },
  deleteIng(id){
    this.smoothie.ingredients = this.smoothie.ingredients.filter(ingID => {
      return ingID !== id
    })
  }
},
created(){
  const ref = db.collection('smoothies').where('slug', '==',this.$route.params.smoothie_slug);
  ref.get().then(snapshot =>{
    snapshot.forEach(doc => {
      this.smoothie = doc.data();
      this.smoothie.id = doc.id;
    })
  })
}
}
</script>
<style>
.edit-smoothie{
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.edit-smoothie h2{
  font-size: 2em;
  margin: 20px auto;
}
.edit-smoothie .field{
  margin:20px auto;
  position: relative;
}
.edit-smoothie .delete{
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>
