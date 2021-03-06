export default {
  container: {
    flex: 1,
  },
  header: {
    flexGrow: 0,
    backgroundColor: '#eee',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    elevation: 3,
  },
  headerTextContainer: {
    flex: 1,
  },
  title: {
    fontWeight: '600',
    fontSize: 20,
  },
  subtitle: {
    fontSize: 20,
    marginTop: 2,
  },
  score: {
    textAlign: 'right',
    fontSize: 40,
    fontWeight: '400',
    flexGrow: 0,
  },
  sectionHeading: {
    backgroundColor: '#eee',
    fontSize: 14,
    fontWeight: 'bold',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 5,
  },
  sectionCell: {
    backgroundColor: '#fff',
  },
  cellText: {
    fontSize: 16,
    padding: 15,
  },
  cellComments: {
    paddingTop: 0,
    color: '#d33',
  },
  emptySetContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    height: '100%',
  },
  emptySetMessage: {
    fontSize: 20,
    textAlign: 'center',
  },
}
