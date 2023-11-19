<template>
  <div>
    <div class="locate-map">
      <h4>{{ trans('view location on map') }}</h4>
      <GmapAutocomplete
        style="display: block; width: 100%; height: 42px; padding: 10px"
        @place_changed="setPlace"
      />
      <a class="search" @click="addMarker">
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
      </a>
    </div>
    <br />
    <GmapMap
      :center="center"
      :zoom="25"
      style="width: 100%; height: 400px; box-shadow: 5px 2px 17px 11px #cccccc"
    >
      <GmapMarker
        :position="center"
        :draggable="true"
        @drag="updateCoordinates"
      />
    </GmapMap>
  </div>
</template>

<script>
export default {
  name: 'GoogleMap',
  props: ['lat', 'lng', 'user'],
  data() {
    return {
      center: {},
      currentPlace: {},
      markers: [],
      places: [],
    }
  },
  mounted() {
    this.geolocate()
  },
  methods: {
    setPlace(place) {
      this.currentPlace = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      }
      this.$emit('getPlace', this.currentPlace)
    },
    addMarker() {
      const marker = {
        lat: this.currentPlace.lat,
        lng: this.currentPlace.lng,
      }
      this.center = marker
      // this.currentPlace = null;
    },
    geolocate() {
      this.center = {
        lat: parseFloat(this.lat),
        lng: parseFloat(this.lng),
      }
      this.currentPlace = {
        lat: parseFloat(this.lat),
        lng: parseFloat(this.lng),
      }
      this.addMarker()
    },
    updateCoordinates(location) {
      this.center = {
        lat: location.latLng.lat(),
        lng: location.latLng.lng(),
      }
      this.currentPlace = {
        lat: location.latLng.lat(),
        lng: location.latLng.lng(),
      }
      this.$emit('getPlace', this.currentPlace)
      this.addMarker()
    },
  },
}
</script>
<style scoped>
.locate-map {
  position: relative;
  color: #acacac;
}
.search {
  position: absolute;
  left: 9px;
  bottom: 8px;
}
h4 {
  display: none;
}
input {
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #e8e8e8;
  border-radius: 13px;
}
</style>
