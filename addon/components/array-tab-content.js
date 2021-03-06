import _ from 'lodash'
import Ember from 'ember'
const {Component} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'
import {getLabel} from '../utils'

export default Component.extend(PropTypeMixin, {
  // ==========================================================================
  // Dependencies
  // ==========================================================================

  // ==========================================================================
  // Properties
  // ==========================================================================

  classNames: ['frost-bunsen-array-tab-content'],

  propTypes: {
    bunsenId: PropTypes.string.isRequired,
    bunsenModel: PropTypes.object.isRequired,
    bunsenStore: PropTypes.EmberObject.isRequired,
    cellConfig: PropTypes.EmberObject.isRequired,
    errors: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    readOny: PropTypes.bool,
    value: PropTypes.object.isRequired
  },

  // ==========================================================================
  // Computed Properties
  // ==========================================================================

  @readOnly
  @computed('cellConfig.item.renderer', 'bunsenStore.renderers')
  /**
   * Get name of component for custom renderer
   * @param {String} renderer - custom renderer to use
   * @returns {String} name of custom renderer component
   */
  customRenderer (renderer) {
    return this.get(`bunsenStore.renderers.${renderer}`)
  },

  @readOnly
  @computed('errors')
  errorMessage (errors) {
    const bunsenId = `${this.get('bunsenId')}.${this.get('index')}`

    if (_.isEmpty(errors)) {
      return null
    }

    const errorMessages = errors[bunsenId]
    return _.isEmpty(errorMessages) ? null : Ember.String.htmlSafe(errorMessages.join('<br>'))
  },

  @readOnly
  @computed('value')
  renderValue (value) {
    const bunsenId = `${this.get('bunsenId')}.${this.get('index')}`
    return value[bunsenId]
  },

  @readOnly
  @computed('cellConfig.item.{container,label}', 'index', 'bunsenModel', 'bunsenStore.view.containers')
  /**
   * Get label text for item
   * @param {String} containerId - ID of container
   * @param {String} label - label
   * @param {Number} index - index of item in array
   * @param {BunsenModel} bunsenModel - bunsen model for entire form
   * @param {BunsenContainer[]} containers - view containers
   * @returns {String} label
   */
  label (containerId, label, index, bunsenModel, containers) {
    const itemContainerConfig = containerId ? _.find(containers, {id: containerId}) : null
    const itemId = itemContainerConfig ? itemContainerConfig.get('id') : ''
    const itemLabel = getLabel(label, bunsenModel, itemId)
    return itemLabel ? `${itemLabel} ${index + 1}` : null
  }

  // ==========================================================================
  // Functions
  // ==========================================================================

  // ==========================================================================
  // Events
  // ==========================================================================

  // ==========================================================================
  // Actions
  // ==========================================================================
})
