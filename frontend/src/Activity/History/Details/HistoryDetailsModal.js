import PropTypes from 'prop-types';
import React from 'react';
import Button from 'Components/Link/Button';
import SpinnerButton from 'Components/Link/SpinnerButton';
import Modal from 'Components/Modal/Modal';
import ModalBody from 'Components/Modal/ModalBody';
import ModalContent from 'Components/Modal/ModalContent';
import ModalFooter from 'Components/Modal/ModalFooter';
import ModalHeader from 'Components/Modal/ModalHeader';
import { kinds } from 'Helpers/Props';
import HistoryDetails from './HistoryDetails';
import styles from './HistoryDetailsModal.css';

function getHeaderTitle(eventType) {
  switch (eventType) {
    case 'grabbed':
      return 'Grabbed';
    case 'downloadFailed':
      return 'Download Failed';
    case 'trackFileImported':
      return 'Track Imported';
    case 'trackFileDeleted':
      return 'Track File Deleted';
    case 'trackFileRenamed':
      return 'Track File Renamed';
    case 'trackFileRetagged':
      return 'Track File Tags Updated';
    case 'albumImportIncomplete':
      return 'Album Import Incomplete';
    case 'downloadImported':
      return 'Download Completed';
    case 'downloadIgnored':
      return 'Download Ignored';
    default:
      return 'Unknown';
  }
}

function HistoryDetailsModal(props) {
  const {
    isOpen,
    eventType,
    sourceTitle,
    data,
    downloadId,
    isMarkingAsFailed,
    shortDateFormat,
    timeFormat,
    onMarkAsFailedPress,
    onModalClose
  } = props;

  return (
    <Modal
      isOpen={isOpen}
      onModalClose={onModalClose}
    >
      <ModalContent onModalClose={onModalClose}>
        <ModalHeader>
          {getHeaderTitle(eventType)}
        </ModalHeader>

        <ModalBody>
          <HistoryDetails
            eventType={eventType}
            sourceTitle={sourceTitle}
            data={data}
            downloadId={downloadId}
            shortDateFormat={shortDateFormat}
            timeFormat={timeFormat}
          />
        </ModalBody>

        <ModalFooter>
          {
            eventType === 'grabbed' &&
              <SpinnerButton
                className={styles.markAsFailedButton}
                kind={kinds.DANGER}
                isSpinning={isMarkingAsFailed}
                onPress={onMarkAsFailedPress}
              >
                Mark as Failed
              </SpinnerButton>
          }

          <Button
            onPress={onModalClose}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

HistoryDetailsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  eventType: PropTypes.string.isRequired,
  sourceTitle: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  downloadId: PropTypes.string,
  isMarkingAsFailed: PropTypes.bool.isRequired,
  shortDateFormat: PropTypes.string.isRequired,
  timeFormat: PropTypes.string.isRequired,
  onMarkAsFailedPress: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired
};

HistoryDetailsModal.defaultProps = {
  isMarkingAsFailed: false
};

export default HistoryDetailsModal;
