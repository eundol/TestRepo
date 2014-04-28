package entity;

/*
 * class name: IoProgessEntity
 * description: iostat 결과 중 tps/read_s/wrtn_s 결과의 변화 추이 그래프를 그리기 위한 자료 형태(entity)
 */
public class IoProgressEntity {
	private String sequence = null;
	private float tpsSequencePoint = 0;
	private float readsSequencePoint = 0;
	private float wrtnsSequencePoint = 0;

	public IoProgressEntity() {
		super();
	}

	public IoProgressEntity(String sequence, float tpsSequencePoint,
			float readsSequencePoint, float wrtnsSequencePoint) {
		super();
		this.sequence = sequence;
		this.tpsSequencePoint = tpsSequencePoint;
		this.readsSequencePoint = readsSequencePoint;
		this.wrtnsSequencePoint = wrtnsSequencePoint;
	}

	public String getSequence() {
		return sequence;
	}

	public void setSequence(String sequence) {
		this.sequence = sequence;
	}

	public float getTpsSequencePoint() {
		return tpsSequencePoint;
	}

	public void setTpsSequencePoint(float tpsSequencePoint) {
		this.tpsSequencePoint = tpsSequencePoint;
	}

	public void addTpsSequencePoint(float tpsSequencePoint) {
		this.tpsSequencePoint += tpsSequencePoint;
	}

	public float getReadsSequencePoint() {
		return readsSequencePoint;
	}

	public void setReadsSequencePoint(float readsSequencePoint) {
		this.readsSequencePoint = readsSequencePoint;
	}

	public void addReadsSequencePoint(float readsSequencePoint) {
		this.readsSequencePoint += readsSequencePoint;
	}

	public float getWrtnsSequencePoint() {
		return wrtnsSequencePoint;
	}

	public void setWrtnsSequencePoint(float wrtnsSequencePoint) {
		this.wrtnsSequencePoint = wrtnsSequencePoint;
	}

	public void addWrtnsSequencePoint(float wrtnsSequencePoint) {
		this.wrtnsSequencePoint += wrtnsSequencePoint;
	}

}
