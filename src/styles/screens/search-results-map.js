export default {
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  callout: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  scoreContainer: {
    paddingLeft: 20,
  },
  busyOverlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    height: 0,
  },
  visibleBusyOverlay: {
    height: 'auto',
  },
  spinnerContainer: {
    padding: 15,
    borderRadius: 15,
    backgroundColor: '#fff',
  }
};
