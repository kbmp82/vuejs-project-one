<template>
  <div id="smoothie" class="add-smoothie container">
<h2 class="center-align indigo-text">Add New Smoothie Recipe</h2>
<form @submit.prevent="addSmoothie">
  <div class="field title">
    <label for="title">Smoothie Title:</label>
    <input type="text" name="title" v-model="title">
  </div>
  <div v-for="(ing, index) in ingredients" :key="index" class="field">
  <label for="ingredient">Ingredients</label>
  <input type="text" name="ingredient" v-model="ingredients[index]">
  <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
  </div>
  <div class="field add-ingredient">
    <label for="add-ingredient">Add Ingredient (press TAB to add multiple):</label>
    <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another">
  </div>
  <div class="field center-align">
    <p v-if="feedback" class="red-text">{{ feedback }}</p>
    <button class="btn pink" name="button">Add Smoothie</button>
  </div>

</form>
  </div>
</template>
<script>
import db from '@/firebase/init';
export default {
  name: "AddSmoothie",
  data() {
return{
  title: null,
  another: null,
  ingredients: [],
  feedback: null
}
},
methods:{
  addSmoothie(){
    if(this.title && this.ingredients){
      const title = _.startCase(this.title);
      const slug = _.kebabCase(_.toLower(this.title.replace(/[^A-Z0-9]/ig, '-')));

      db.collection('smoothies').add({
      title: title,
      slug: slug,
      ingredients: this.ingredients
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
  if(this.another && !this.ingredients.includes(this.another)){
    this.ingredients.push(_.upperFirst(this.another));
    this.another = null;
    this.feedback = null;
    //console.log(this.ingredients);
  }else{
    this.feedback ='ingredient already exists or is blank';
  }
},
deleteIng(id){
  this.ingredients = this.ingredients.filter(ingID => {
    return ingID !== id
  })
}
}
}
</script>
<style>
.add-smoothie{
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.add-smoothie h2{
  font-size: 2em;
  margin: 20px auto;
}
.add-smoothie .field{
  margin:20px auto;
  position: relative;
}
.add-smoothie .delete{
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>
